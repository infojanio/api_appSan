import { Request, Response, NextFunction } from "express";
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';
import AppError from '../errors/AppError';

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
        throw new AppError('JWT token is missing!', 401)
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
        throw new AppError('Token inválido!', 401);    
    }
   
  }
//verifica se o usuário está autenticado na aplicação