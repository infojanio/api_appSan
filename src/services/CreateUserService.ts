
import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs'
import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';

interface Request {
name: string; 
matricula: string;
email: string;
password: string;
whatsapp: string; 
avatar: string; 
}

class CreateUserService {
    public async execute ({name, matricula, email, password, whatsapp, avatar}: Request): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);
                
        //verifica se o usuário existe, não poderá haver usuários duplicados
        const checkUserExists = await usersRepository.findOne({
            where: { matricula },
        });

        if(checkUserExists) {
            throw new Error ('Usuário com essa matrícula já cadastrado!');
        }

        //criptografa a senha do usuário
        const hashedPassword = await hash(password, 8);

        const user = usersRepository.create({
            name,
            matricula,
            email,
            password: hashedPassword,
            whatsapp,
            avatar,
        });

        await usersRepository.save(user);
        
        return user; 
    }
}

export default CreateUserService;