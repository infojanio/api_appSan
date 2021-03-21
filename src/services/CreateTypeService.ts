
import { getCustomRepository, getRepository } from 'typeorm';
import Type from '../models/Type';
import TypesRepository from '../repositories/TypesRepository';
import AppError from '../errors/AppError';

interface Request {
image: string;
title: string;
  }

class CreateTypeService {
    public async execute ({image, title}: Request): Promise<Type> {
        const typesRepository = getCustomRepository(TypesRepository);


        //verifica se o usuário existe, não poderá haver usuários duplicados
        const checkTypeExists = await typesRepository.findOne({
            where: { title },
        });

        if(checkTypeExists) {
            throw new AppError ('Tipo de vazamento já cadastrado!');
        }

      const type = typesRepository.create({
            image,
            title,

        });

      await typesRepository.save(type);
     // console.log(type);
      return type;

    }
}

export default CreateTypeService;
