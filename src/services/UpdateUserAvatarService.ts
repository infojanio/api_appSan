import {getRepository} from 'typeorm';
import path from 'path';
import fs from 'fs'; 

import uploadConfig from '../config/upload';
import User from '../models/User'

interface Request {
    user_id: string;
    avatarFilename: string;
}
//faz a atualização do avata do usuário
class UpdateUserAvatarService {
    public async execute({user_id, avatarFilename}:Request): Promise<User> {
        const usersRepository = getRepository(User);

        //verifica se o usuário é válido
        const user = await usersRepository.findOne(user_id);

        //se o usuário não tiver autenticado
        if(!user){
            throw new Error('Apenas usuários autenticados podem alterar avatar!');
        }

        //se o usuário tiver avatar
        if (user.avatar) { 
            //deletar avatar anterior
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

            if(userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

            user.avatar = avatarFilename;

            //se já existir avatar de usuário irá atualizar, se não irá incluir
            await usersRepository.save(user);

            return user;

        }
    }

export default UpdateUserAvatarService;