import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import multer from 'multer';

import uploadConfig from '../config/upload';
import UpdateTypeImageService from '../services/UpdateTypeImageService';

import TypesController from '../controllers/TypesController';
import TypesRepository from '../repositories/TypesRepository';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const typesRouter = Router();
const typesController = new TypesController();
const upload = multer(uploadConfig);

//retorna todos os pontos de vazamento
typesRouter.get('/', typesController.index);

//rota de criação do tipo de vazamento
typesRouter.post('/', typesController.create);


//atualiza uma única informação - upload de imagem
    //atualiza uma única informação
    typesRouter.patch('/image', ensureAuthenticated, upload.single('image'),
    async(request, response) => {

            const updateTypeImage = new UpdateTypeImageService();

            const type = await updateTypeImage.execute({

            id: request.body.id,
            imageFilename: request.file.filename,
            });

            return response.json(type);


    });

// Cria ou Atualiza a imagem do tipo de vazamento

 export default typesRouter;
