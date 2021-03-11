import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import CreateUserService from '../services/CreateUserService';
import UsersRepository from '../repositories/UsersRepository';

const usersRouter = Router();

//retorna todos os pontos de vazamento
usersRouter.get('/', async(request, response)=> {
    const usersRepository = getCustomRepository(UsersRepository);
    const users = await usersRepository.find(); 

    return response.json(users);
});


usersRouter.post('/', async(request, response) => {
    try {
        const {name, matricula, email, password, whatsapp, avatar} = request.body;

        const createUser = new CreateUserService();

        const user = await createUser.execute({
            name,
            matricula,
            email,
            password,
            whatsapp,
            avatar,

        });

        //deleta o retorno da senha
        delete user.password;

        return response.status(201).json(user);
    } 
    catch (err) {
        return response.status(400).json({err: "Erro ao cadastrar usuário!" });
    }
});

 export default usersRouter;