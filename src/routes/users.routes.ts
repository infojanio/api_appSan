import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import multer from 'multer';

import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';
import UsersRepository from '../repositories/UsersRepository';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

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
     
    //atualiza uma única informação 
    usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), 
    async(request, response) => {
        console.log(request.file);
        return response.json({ok:true});
    });  
 export default usersRouter;