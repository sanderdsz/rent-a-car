import { getRepository, Repository } from "typeorm";

import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";
import { Car } from "../../entities/Car";
import { ICarsRepository } from "../ICarsRepository";

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    brand,
    category_id,
    description,
    fine_amount,
    license_plate,
    name,
    daily_rate,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      name,
      description,
      brand,
      fine_amount,
      license_plate,
      category_id,
      daily_rate,
    });

    await this.repository.save(car);

    return car;
  }
  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({ license_plate });
    return car;
  }
}

export { CarsRepository };
