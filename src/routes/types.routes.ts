import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import CreateTypeService from '../services/CreateTypeService';
import TypesRepository from '../repositories/TypesRepository';

const typesRouter = Router();

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

 export default typesRouter;