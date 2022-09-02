import { getRepository, Repository } from "typeorm";

import { ICreateRentalDTO } from "../../dtos/ICreateRentalDTO";
import { Rental } from "../../entities/Rental";
import { IRentalRepository } from "../IRentalRepository";

class RentalsRepository implements IRentalRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async create({
    user_id,
    car_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = await this.repository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    await this.repository.save(rental);

    return rental;
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const rental = await this.repository.findOne({ car_id });

    return rental;
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const rental = await this.repository.findOne({ user_id });

    return rental;
  }
}

export { RentalsRepository };
