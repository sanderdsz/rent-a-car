import { NextFunction, Request, Response } from "express";

import { UserRepository } from "../modules/accounts/repositories/implementations/UserRepository";
import { AppError } from "../shared/errors/AppError";

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { id } = request.user;

  const usersRepository = new UserRepository();
  const user = await usersRepository.findById(id);

  if (!user.isAdmin) {
    throw new AppError("User does not have admin rights");
  }

  return next();
}
