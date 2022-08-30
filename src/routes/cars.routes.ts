import { Router } from "express";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateCarController } from "../modules/cars/useCases/createCar/CreateCarController";
import { ListCarsController } from "../modules/cars/useCases/listCars/ListCarsController";

const carRoutes = Router();

const createCarController = new CreateCarController();
const listCarController = new ListCarsController();

carRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);
carRoutes.get("/", ensureAuthenticated, listCarController.handle);

export { carRoutes };
