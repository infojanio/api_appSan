import { parseISO, startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Point from '../models/Point';
import PointsRepository from '../repositories/PointsRepository';
import AppError from '../errors/AppError';

interface Request {
  userId: string,
  typeId: string,
date: Date;
meter: string;
image: string;
latitude: number;
longitude: number;
city: string;
  uf: string;
  status: boolean;

}

//Nos services abstraímos todos os tipos de lógica

class CreatePointService {
    public async execute ({userId, typeId, date, meter, image, latitude, longitude, city, uf, status }: Request): Promise<Point> {
        const pointsRepository = getCustomRepository(PointsRepository);

       //verifica já foi informado, não poderá haver vários pontos de vazamento para o mesmo hidrômetro
        const checkTypeExists = await pointsRepository.findOne({
            where: { meter },
        });

        if(checkTypeExists) {
            throw new AppError ('Tipo de vazamento já cadastrado!');
        }

      const point = pointsRepository.create({
          userId,
            date,
            meter,
            image,
            latitude,
            longitude,
            city,
            uf,
          status,
          typeId,

        });


        await pointsRepository.save(point);
        return point;
    }
}

export default CreatePointService;
