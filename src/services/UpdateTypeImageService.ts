import {getRepository} from 'typeorm';
import path from 'path';
import fs from 'fs'; 

import uploadConfig from '../config/upload';
import Type from '../models/Type';
import AppError from '../errors/AppError';

interface Request {
    id: string;
    imageFilename: string;
}
//faz a atualização do avata do usuário
class UpdateTypeImageService {
    public async execute({id, imageFilename}:Request): Promise<Type> {
        const typesRepository = getRepository(Type);

        //verifica se o usuário é válido
        const type = await typesRepository.findOne(id);

        //se o tipo existe
        if(!type){
            //não encontrar o id do tipo
            console.log(type.id)
            console.log(type.image)
            throw new AppError('Apenas tipos cadastrados podem ser alterados!', 401);
        }

        //se o tipo tiver image
        if (type.image) { 
            //deletar avatar anterior
            const typeImageFilePath = path.join(uploadConfig.directory, type.image);

            const typeImageFileExists = await fs.promises.stat(typeImageFilePath);

            if(typeImageFileExists) {
                await fs.promises.unlink(typeImageFilePath);
            }
        }

            type.image = imageFilename;

            //se já existir avatar de usuário irá atualizar, se não irá incluir
            await typesRepository.save(type);

            return type;

        }
    }

export default UpdateTypeImageService;