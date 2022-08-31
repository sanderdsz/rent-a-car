import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../entities/Car";

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  list(brand?: string, category_id?: string, name?: string): Promise<Car[]>;
  findById(id: string): Promise<Car>;
}

export { ICarsRepository };
