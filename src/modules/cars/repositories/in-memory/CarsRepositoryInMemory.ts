import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";
import { Car } from "../../entities/Car";
import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_place,
    name,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_place,
      name,
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_place: string): Promise<Car> {
    return this.cars.find((car) => car.license_place === license_place);
  }
}

export { CarsRepositoryInMemory };
