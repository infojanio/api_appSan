import {getRepository} from 'typeorm';
import path from 'path';
import fs from 'fs'; 

import uploadConfig from '../config/upload';
import Point from '../models/Point';

interface Request {
    id: string;
    fotoFilename: string;
}
//faz a atualização da foto do ponto
class UpdatePointFotoService {
    public async execute({id, fotoFilename}:Request): Promise<Point> {
        const pointsRepository = getRepository(Point);

        //verifica se o ponto existe
        const point = await pointsRepository.findOne(id);

        //se o ponto existe
        if(!point){
            //não encontrar o id do ponto
            console.log(point.id)
            console.log(point.image)
            throw new Error('Apenas pontos cadastrados podem ser alterados!');
        }

        //se o ponto tiver image
        if (point.image) { 
            //deletar foto anterior
            const pointFotoFilePath = path.join(uploadConfig.directory, point.image);

            const pointFotoFileExists = await fs.promises.stat(pointFotoFilePath);

            if(pointFotoFileExists) {
                await fs.promises.unlink(pointFotoFilePath);
            }
        }

            point.image = fotoFilename;

            //se já existir foto irá atualizar, se não irá incluir
            await pointsRepository.save(point);

            return point;

        }
    }

export default UpdatePointFotoService;