import { Router } from 'express';
import { UserController } from './controllers/UserController';
import { SurveysController } from './controllers/SurveysController';

const router = Router();

const userController = new UserController();
const surveyController = new SurveysController();

//rotas para salvar
router.post("/users", userController.create);
router.post("/surveys", surveyController.create);

//rotas para listar
router.get("/surveys", surveyController.show);

export { router };   