import { Router } from "express";

import { AuthenticateUserController } from "../modules/accounts/useCases/authenticateUser/AuthenticateUserController";
import { RefershTokenController } from "../modules/accounts/useCases/refreshToken/RefreshTokenController";

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refershTokenController = new RefershTokenController();

authenticateRoutes.post("/session", authenticateUserController.handle);

authenticateRoutes.post("/refresh-token", refershTokenController.handle);

export { authenticateRoutes };
