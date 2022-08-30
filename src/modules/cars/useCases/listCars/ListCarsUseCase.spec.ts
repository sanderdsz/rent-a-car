import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { ListCarsUseCase } from "./ListCarsUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listCarsUseCase: ListCarsUseCase;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
  });

  it("should be able to list all cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Lorem Ipsum Car",
      description: "Foo Bar Car",
      daily_rate: 100,
      license_plate: "ABC123",
      fine_amount: 25,
      brand: "Lorem Ipsum Brand",
      category_id: "89cf626b-5f78-4d88-9532-694ff260bb98",
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Lorem Ipsum Car",
      description: "Foo Bar Car",
      daily_rate: 100,
      license_plate: "ABC123",
      fine_amount: 25,
      brand: "Lorem Ipsum Brand",
      category_id: "89cf626b-5f78-4d88-9532-694ff260bb98",
    });

    const cars = await listCarsUseCase.execute({
      name: "Lorem Ipsum Car",
    });

    expect(cars).toEqual([car]);
  });
});
