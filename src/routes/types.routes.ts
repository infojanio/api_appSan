import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import multer from 'multer';

import uploadConfig from '../config/upload';

import CreateTypeService from '../services/CreateTypeService';
import TypesRepository from '../repositories/TypesRepository';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const typesRouter = Router();
const upload = multer(uploadConfig);

//retorna todos os pontos de vazamento
typesRouter.get('/', async(request, response)=> {
    const typesRepository = getCustomRepository(TypesRepository);
    const types = await typesRepository.find(); 

    return response.json(types);
});


typesRouter.post('/', async(request, response) => {
    try {
        const {image, title} = request.body;

        const createType = new CreateTypeService();

        const type = await createType.execute({
           image,
           title,

        });

        return response.status(201).json(type);
    } 
    catch (err) {
        return response.status(400).json({err: "Erro ao cadastrar tipo de vazamento!" });
    }
});
    //atualiza uma única informação - upload de imagem 
    typesRouter.patch('/image', ensureAuthenticated, upload.single('image'), 
    async(request, response) => {
        console.log(request.file);
        return response.json({ok:true});
    });  
 export default typesRouter;