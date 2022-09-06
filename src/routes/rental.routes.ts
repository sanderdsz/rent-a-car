import { Router } from "express";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateRentalController } from "../modules/rentals/useCases/createRantel/CreateRentalController";
import { DevolutionRentalController } from "../modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import { ListRentalByUserController } from "../modules/rentals/useCases/listRentalByUser/ListRentalByUserController";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalByUserController = new ListRentalByUserController();

rentalRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createRentalController.handle
);

rentalRoutes.post(
  "/devolution/:id",
  ensureAuthenticated,
  ensureAdmin,
  devolutionRentalController.handle
);

rentalRoutes.get("/", ensureAuthenticated, listRentalByUserController.handle);

export { rentalRoutes };
