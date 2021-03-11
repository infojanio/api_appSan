import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import TypesRepository from '../repositories/TypesRepository';

class TypeController {

    //método para salvar
    async create(request: Request, response:Response) {
        const { image, title } = request.body;        
        const typesRepository = getCustomRepository(TypesRepository);
        
        //Não permite que salvamos usuários com email repetido
        const typeAlreadyExists = await typesRepository.findOne({title})  //findOne({email}) => SELECT * FROM USERS WHERE EMAIL = "EMAIL" 

        const type = typesRepository.create({
            image, 
            title,
        });

        //verifica se o usuário já existe
        if (typeAlreadyExists) {
            return response.status(400).json({
            error: "Tipo de vazamento já existe!",
            })
        }

        await typesRepository.save(type);
        
        return response.status(201).json(type);
    }
}

export default TypeController;
