import { compare } from 'bcryptjs';
import { getRepository } from 'typeorm';
//import { hash } from 'bcryptjs'
import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';


interface Request {
    matricula: string;
    password: string;
}

interface Response {
    user: User;
}

class AuthenticateUserService {

    public async execute({matricula, password}:Request): Promise<Response> {
        const usersRepository = getRepository(User);

        //verifica se o usuário existe, não poderá haver usuários duplicados
        const user = await usersRepository.findOne({
            where: { matricula },
        });

        if(!user) { //se digitar dados diferentes
            throw new Error ('Matrícula ou senha incorreta!');
        }
        //user.password -> senha criptografada
        //password -> senha não criptograda
        const passwordMatched = await compare(password, user.password); 

        if (!passwordMatched) {
            throw new Error('Matrícula ou senha incorreta!');
        }
        //aqui usuário autenticado
        return {
            user,
        };

     }
    }
    export default AuthenticateUserService;
