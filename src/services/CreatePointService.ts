import { parseISO, startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Point from '../models/Point';
import PointsRepository from '../repositories/PointsRepository';

interface Request {
provider_id: string;
type_id: string;
date: Date;
meter: string;
image: string;
latitude: number; 
longitude: number;
city: string;
uf: string; 
}

class CreatePointService {
    public async execute ({provider_id, type_id, date, meter, image, latitude, longitude, city, uf}: Request): Promise<Point> {
        const pointsRepository = getCustomRepository(PointsRepository);

        /*
        const pointDate = startOfHour(date);
       // const parsedDate = parseISO(date);

       //busca pontos em uma única data
        const findPointInSameDate = await pointsRepository.findByDate(
            pointDate,
        ); 

        if (findPointInSameDate) {
            throw Error ('Erro ao informar ponto de vazamento!');
        } 
        */

    //verifica já foi informado, não poderá haver vários pontos de vazamento para o mesmo hidrômetro
        const checkTypeExists = await pointsRepository.findOne({
            where: { meter },
        });

        if(checkTypeExists) {
            throw new Error ('Tipo de vazamento já cadastrado!');
        }

        //const parsedDate = parseISO(date);
       // const pointDate = startOfHour(date);
    
        const point = pointsRepository.create({
            provider_id,
            type_id,
            date, 
            meter, 
            image, 
            latitude, 
            longitude, 
            city, 
            uf,
        });

        await pointsRepository.save(point);
        return point; 
    }
}

export default CreatePointService;