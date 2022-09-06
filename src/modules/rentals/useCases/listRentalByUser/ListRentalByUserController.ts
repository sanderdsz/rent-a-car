import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListRentalByUserUseCase } from "./ListRentalByUserUseCase";

class ListRentalByUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listRentalsByUserUseCase = container.resolve(ListRentalByUserUseCase);

    const { id } = request.user;

    const rentals = await listRentalsByUserUseCase.execute({ user_id: id });

    return response.status(200).send(rentals);
  }
}

export { ListRentalByUserController };
