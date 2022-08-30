import { container } from "tsyringe";

import { UserRepository } from "../../modules/accounts/repositories/implementations/UserRepository";
import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository";
import { ICarsRepository } from "../../modules/cars/repositories/ICarsRepository";
import { ICategoriesRepository } from "../../modules/cars/repositories/ICategoriesRepository";
import { CarsRepository } from "../../modules/cars/repositories/implementations/CarsRepository";
import { CategoriesRepository } from "../../modules/cars/repositories/implementations/CategoriesRepository";
import { SpecificationsRepository } from "../../modules/cars/repositories/implementations/SpecificationsRepository";
import { ISpecificationsRepository } from "../../modules/cars/repositories/ISpecificationsRepository";

// Interfaces
container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepository",
  SpecificationsRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UserRepository
);

container.registerSingleton<ICarsRepository>("CarsRepository", CarsRepository);
