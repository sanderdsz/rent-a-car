import { Router } from "express";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateCarController } from "../modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "../modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListCarsController } from "../modules/cars/useCases/listCars/ListCarsController";

const carRoutes = Router();

const createCarSpecificationController = new CreateCarSpecificationController();
const createCarController = new CreateCarController();
const listCarController = new ListCarsController();

carRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

carRoutes.get("/", ensureAuthenticated, listCarController.handle);

carRoutes.post(
  "/specifications/:id",
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle
);

export { carRoutes };
