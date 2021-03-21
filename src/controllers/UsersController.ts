import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../repositories/UsersRepository';

class UserController {

    //método para salvar
    async create(request: Request, response:Response) {
        const { name, matricula, email, password, whatsapp, avatar } = request.body;        
        const usersRepository = getCustomRepository(UsersRepository);
        
        //Não permite que salvamos usuários com email repetido
        const userAlreadyExists = await usersRepository.findOne({matricula})  //findOne({email}) => SELECT * FROM USERS WHERE EMAIL = "EMAIL" 

        const user = usersRepository.create({
            name, 
            matricula,
            email,
            password, 
            whatsapp,
            avatar
        });

        //verifica se o usuário já existe
        if (userAlreadyExists) {
            return response.status(400).json({
            error: "Usuário já existe!",
            })
        }

        await usersRepository.save(user);
        
        return response.status(201).json(user);
    }

    //método para atualizar
    
}

export default UserController;
