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
    const { sub } = verify(
      token,
      "5ebe2294ecd0e0f08eab7690d2a6ee69"
    ) as ITokenPayload;

    const usersRepository = new UserRepository();

    const user = await usersRepository.findById(sub);

    if (!user) {
      throw new AppError("User not found.", 401);
    }

    next();
  } catch (err) {
    throw new AppError("Invalid JWT token.", 401);
  }

  /*
  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    const { sub } = decoded as ITokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch (err) {
    throw new Error("Invalid JWT token.");
  }
  */
}
