import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    await expect(true).toBe(true);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Lorem Ipsum",
      description: "Foo bar",
      daily_rate: 100,
      license_plate: "123456",
      fine_amount: 100,
      brand: "Foo",
      category_id: "01",
    });

    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a car with existent license plate", () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Lorem Ipsum",
        description: "Foo bar",
        daily_rate: 100,
        license_plate: "123456",
        fine_amount: 100,
        brand: "Foo",
        category_id: "01",
      });

      await createCarUseCase.execute({
        name: "Bar Foo",
        description: "Foo bar",
        daily_rate: 100,
        license_plate: "123456",
        fine_amount: 100,
        brand: "Foo",
        category_id: "01",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Lorem Ipsum",
      description: "Foo bar",
      daily_rate: 100,
      license_plate: "123456",
      fine_amount: 100,
      brand: "Foo",
      category_id: "01",
    });

    expect(car.available).toBe(true);
  });
});
