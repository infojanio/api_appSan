import 'reflect-metadata';
import express from 'express';
import uploadConfig from './config/upload';

import createConnection from "./database";
import { router } from './routes/index';

createConnection(); //chama a função criada no ./database/index.ts
const app = express();


app.use(express.json());//informar ao servidor que vamos trabalhar com formato json

app.use('/files', express.static(uploadConfig.directory)); //rota caminho p/ visualizar as imagens

app.use(router);

export { app }