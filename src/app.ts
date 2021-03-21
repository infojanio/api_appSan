import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import uploadConfig from './config/upload';

import createConnection from "./database";
import { router } from './routes/index';
import AppError from './errors/AppError';

createConnection(); //chama a função criada no ./database/index.ts
const app = express();


app.use(express.json());//informar ao servidor que vamos trabalhar com formato json

app.use('/files', express.static(uploadConfig.directory)); //rota caminho p/ visualizar as imagens

app.use(router);



//faz a tratativa de erros depois das rotas
app.use((err:Error, request:Request, response:Response, next:NextFunction)=> {
    //se for um erro da aplicação
    if(err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }
        console.log(err);

        return response.status(500).json({
            status:'error',
            message: 'internal server error',
        });
});

export default app;