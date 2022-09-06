import dayjs from "dayjs";

import { AppError } from "../../../../shared/errors/AppError";
import { DayjsDateProvider } from "../../../../shared/provider/implementations/DayjsDateProvider";
import { CarsRepositoryInMemory } from "../../../cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalRepositoryInMemory } from "../../repositories/in-memory/RentalRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalRepositoryInMemory: RentalRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayJsProvider: DayjsDateProvider;

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(2, "day").toDate();

  beforeEach(() => {
    dayJsProvider = new DayjsDateProvider();
    rentalRepositoryInMemory = new RentalRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalRepositoryInMemory,
      dayJsProvider,
      carsRepositoryInMemory
    );
  });

  it("should be able to create a new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car test",
      description: "test",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 25,
      category_id: "1",
      brand: "brand",
    });

    const rental = await createRentalUseCase.execute({
      car_id: car.id,
      user_id: "1234",
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental when another is open to the same user", async () => {
    const car_01 = await carsRepositoryInMemory.create({
      name: "Car test",
      description: "test",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 25,
      category_id: "1",
      brand: "brand",
    });

    const car_02 = await carsRepositoryInMemory.create({
      name: "Car test",
      description: "test",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 25,
      category_id: "1",
      brand: "brand",
    });

    await createRentalUseCase.execute({
      car_id: car_01.id,
      user_id: "1234",
      expected_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        car_id: car_02.id,
        user_id: "1234",
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("Car is unavailable"));
  });

  it("should not be able to create a new rental when another is open to the same car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car test",
      description: "test",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 25,
      category_id: "1",
      brand: "brand",
    });

    await createRentalUseCase.execute({
      car_id: car.id,
      user_id: "1234",
      expected_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        car_id: car.id,
        user_id: "12345",
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("Car is unavailable"));
  });

  it("should not be able to create a new rental with invalid return time", async () => {
    await expect(
      createRentalUseCase.execute({
        car_id: "1234",
        user_id: "1234",
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError("Invalid return date"));
  });
});
