import { Router } from 'express';

import pointsRouter from './points.routes';
import usersRouter from './users.routes';
import typesRouter from './types.routes';
import sessionsRouter from './sessions.routes';

const router = Router();

//rotas para salvar
router.use("/users", usersRouter);
router.use("/types", typesRouter);
router.use("/points", pointsRouter);
router.use("/sessions", sessionsRouter);


export { router };   