import { Request, Response, NextFunction } from "express";
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

interface TokenPayLoad {
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthenticated (
    request: Request,
    response: Response,
    next: NextFunction, 
    ):void{
    const authHeader = request.headers.authorization;

    //dispara o erro caso o token não seja válido
    if (!authHeader) {
        throw new Error('JWT token is missing!')
    }

    const [ ,token] = authHeader.split(' ');

    try {
        const decoded = verify(token, authConfig.jwt.secret);
        const {sub} = decoded as TokenPayLoad;

        request.user = {
            id: sub,
        };
        
        
        return next();
    }
     catch (error) {
        throw new Error('Token inválido!');    
    }
   
  }
//verifica se o usuário está autenticado na aplicação