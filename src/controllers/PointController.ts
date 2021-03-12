import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import PointsRepository from '../repositories/PointsRepository';

class PointController {

    //método para salvar
    async create(request: Request, response:Response) {
        const { provider_id, type_id, date, meter, image, latitude, longitude, city, uf } = request.body;        
        const pointsRepository = getCustomRepository(PointsRepository);
        
        //Não permite que salvamos usuários com email repetido
        const pointAlreadyExists = await pointsRepository.findOne({meter})  //findOne({email}) => SELECT * FROM USERS WHERE EMAIL = "EMAIL" 

        const point = pointsRepository.create({   
            provider_id,
            type_id, 
            date,         
            meter,
            image,
            latitude,
            longitude,
            city,
            uf
        });

        //verifica se o ponto já existe
        if (pointAlreadyExists) {
            return response.status(400).json({
            error: "Já existe ocorrência para este hidrômetro!",
            })
        }

        await pointsRepository.save(point);
        
        return response.status(201).json(point);
    }
}

export default PointController;
