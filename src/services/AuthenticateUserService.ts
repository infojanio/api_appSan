import { compare } from 'bcryptjs';
import { getRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../config/auth';



interface Request {
    matricula: string;
    password: string;
}

interface Response {
    user: User;
    token: string;
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
        
        const { secret, expiresIn } = authConfig.jwt;
        //aqui usuário autenticado
        const token = sign({}, secret, {
            subject: user.id,
            expiresIn,
        });


        return {
            user,
            token,
        };

     }
    }
    export default AuthenticateUserService;
