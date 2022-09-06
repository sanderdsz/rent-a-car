import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import auth from "../config/auth";
import { UserRepository } from "../modules/accounts/repositories/implementations/UserRepository";
import { UsersTokensRepository } from "../modules/accounts/repositories/implementations/UsersTokensRepository";
import { AppError } from "../shared/errors/AppError";

interface ITokenPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const userTokensRepository = new UsersTokensRepository();

  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT token is missing.", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      auth.secret_refresh_token
    ) as ITokenPayload;

    const user = await userTokensRepository.findByUserIdAndRefreshToken(
      user_id,
      token
    );

    if (!user) {
      throw new AppError("User not found.", 401);
    }

    request.user = {
      id: user_id,
    };

    next();
  } catch (err) {
    throw new AppError("Invalid JWT token.", 401);
  }
}
