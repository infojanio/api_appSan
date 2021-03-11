import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import PointsRepository from '../repositories/PointsRepository';
import CreatePointService from '../services/CreatePointService';

const pointsRouter = Router();


//retorna todos os pontos de vazamento
pointsRouter.get('/', async(request, response)=> {
    const pointsRepository = getCustomRepository(PointsRepository);
    const points = await pointsRepository.find(); //busca todos os dados

    return response.json(points);
});

//cria pontos de vazamento
pointsRouter.post('/', async(request, response) => {
    try {
        const {provider_id, type_id, date, meter, image, latitude, longitude, city, uf}= request.body;

        const parseDate = parseISO(date); 

        const createPoint = new CreatePointService();
    
        const point = await createPoint.execute({ 
            provider_id,
            type_id,       
            date: parseDate, 
            meter, 
            image, 
            latitude, 
            longitude, 
            city, 
            uf,

        });

        return response.status(201).json(point);
        
    } 
    catch (err) {
        
        return response.status(400).json({err:"Erro ao cadastrar o ponto de vazamento!"});
        
    }
    
});

 export default pointsRouter;