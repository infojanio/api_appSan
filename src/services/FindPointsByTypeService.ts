import { parseISO, startOfHour } from 'date-fns';
import { getCustomRepository, getRepository } from 'typeorm';

import Point from '../models/Point';
import PointsRepository from '../repositories/PointsRepository';
import AppError from '../errors/AppError';

interface Request {

  typeId: string;


}

//Nos services abstraímos todos os tipos de lógica

class FindPointsByTypeService {
    public async execute ({typeId}: Request): Promise<Point[] | undefined> {
        const findPointsRepository = getRepository(Point);

       //verifica já foi informado, não poderá haver vários pontos de vazamento para o mesmo hidrômetro
        const findPoints = await findPointsRepository.find({
            where: { typeId },
        });

        if(!findPoints) {
            throw new AppError ('Não existe pontos informados para esse tipo de vazamento!');
        }

       return findPoints;
    }
}

export default FindPointsByTypeService;
