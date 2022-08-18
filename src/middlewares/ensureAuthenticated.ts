import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../errors/AppError";
import { UserRepository } from "../modules/accounts/repositories/implementations/UserRepository";

interface ITokenPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT token is missing.", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      "5ebe2294ecd0e0f08eab7690d2a6ee69"
    ) as ITokenPayload;

    const usersRepository = new UserRepository();

    const user = await usersRepository.findById(user_id);

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
