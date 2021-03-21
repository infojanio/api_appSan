/*
import { getCustomRepository } from 'typeorm';

import PointType from '../models/PointType';
import PointTypesRepository from '../repositories/PointTypesRepository';

interface Request {
  point_id: string;
  type_id: string;

}

class CreatePointTypesService {
    public async execute ({point_id, type_id}: Request): Promise<PointType> {
        const pointTypesRepository = getCustomRepository(PointTypesRepository);

            const pointType = pointTypesRepository.create({
              point_id,
              type_id,
        });

        await pointTypesRepository.save(pointType);
        return pointType;
    }
}

export default CreatePointTypesService;

*/
