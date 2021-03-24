import { Request, Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';
import multer from 'multer';

import uploadConfig from '../config/upload';

import PointsController from '../controllers/PointsController';
import PointsRepository from '../repositories/PointsRepository';
import CreatePointService from '../services/CreatePointService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UpdatePointFotoService from '../services/UpdatePointFotoService';
import FindPointsByCityService from '../services/FindPointsByCityService';

const pointsRouter = Router();
const pointsController = new PointsController();



const upload = multer(uploadConfig);

pointsRouter.use(ensureAuthenticated); //requer condição logado para acessar rota de envio de ponto


//retorna todos os pontos de vazamento
pointsRouter.get('/', pointsController.index);


//listar 1 ponto de vazamento específico
pointsRouter.get('/:id', pointsController.show);


pointsRouter.get('/list/:city', pointsController.filter);



//atualiza uma única informação - upload de imagem
//atualiza uma única informação
pointsRouter.patch('/foto', ensureAuthenticated, upload.single('image'),
async(request, response) => {

        const updatePointFoto = new UpdatePointFotoService();

        const point = await updatePointFoto.execute({

        id: request.body.id,
        fotoFilename: request.file.filename,
        });

        return response.json(point);

    });


 export default pointsRouter;
