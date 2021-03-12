import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';
import multer from 'multer';

import uploadConfig from '../config/upload';

import PointsRepository from '../repositories/PointsRepository';
import CreatePointService from '../services/CreatePointService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const pointsRouter = Router();
const upload = multer(uploadConfig); 

pointsRouter.use(ensureAuthenticated); //requer condição logado para acessar rota de envio de ponto


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

    //atualiza uma única informação - upload de imagem 
    pointsRouter.patch('/foto', ensureAuthenticated, upload.single('foto'), 
    async(request, response) => {
        console.log(request.file);
        return response.json({ok:true});
    }); 

 export default pointsRouter;