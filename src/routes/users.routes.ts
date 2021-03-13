import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import multer from 'multer';

import uploadConfig from '../config/upload';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

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
        
        try {
            const updateUserAvatar = new UpdateUserAvatarService();
            const user = await updateUserAvatar.execute({

            user_id: request.user.id,
            avatarFilename: request.file.filename,
            });

            //deleta retorna da senha
            delete user.password;

            return response.json(user);

        } catch (error) {
            return response.status(400).json({err: error.message });
        }
    });  
 export default usersRouter;



  /* Se der erro ao remover o retorno da senha do usuário, resolução abaixo
        
// Com a atualização do TypeScript, isso se faz necessário
    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
    return response.json(userWithoutPassword);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});
    return response.json(userWithoutPassword);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});
        */