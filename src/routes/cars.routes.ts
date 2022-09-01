import { Router } from "express";
import multer from "multer";

import uploadConfig from "../config/upload";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateCarController } from "../modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "../modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListCarsController } from "../modules/cars/useCases/listCars/ListCarsController";
import { UploadCarImageController } from "../modules/cars/useCases/uploadCarImage/UploadCarImageController";

const carRoutes = Router();

const createCarSpecificationController = new CreateCarSpecificationController();
const createCarController = new CreateCarController();
const listCarController = new ListCarsController();
const uploadCarImageController = new UploadCarImageController();

const uploadCarImage = multer(uploadConfig.upload("./cars"));

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

carRoutes.post(
  "/images/:id",
  ensureAuthenticated,
  ensureAdmin,
  uploadCarImage.array("images"),
  uploadCarImageController.handle
);

export { carRoutes };
