import { inject, injectable } from "tsyringe";

import { Rental } from "../../entities/Rental";
import { IRentalRepository } from "../../repositories/IRentalRepository";

interface IRequest {
  user_id: string;
}

@injectable()
class ListRentalByUserUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalRepository
  ) {}

  async execute({ user_id }: IRequest): Promise<Rental[]> {
    const rentals = await this.rentalsRepository.findByUserId(user_id);

    return rentals;
  }
}

export { ListRentalByUserUseCase };
