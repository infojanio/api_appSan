import request from 'supertest';
import { app } from '../app';

import { Connection, getConnection } from 'typeorm';
import createConnection from "../database";


let connection: Connection;

describe ("Users", ()=> {

    //Roda as migrations antes de executar os testes para criar as tabelas
    beforeAll(async()=> {

        connection = await createConnection('test_nlw4');  
        
       
       await connection.query('DELETE FROM users');
        await connection.runMigrations(); 
    })

     
      afterAll(async () => {
        const mainConnection = getConnection();
    
        await connection.close();
        await mainConnection.close();
      });


      //Início dos testes
    //Testando a rota /users - criação de usuários
    it("Testa a criação de novo usuário", async()=> {
        const response = await request(app).post("/users").send({
            email: "janio@example.com",
            name: "User Example" 
    });
        expect (response.status).toBe(201);
    });

        //Testando se está salvando usuário com mesmo email
        it("Testa a criação de usuário com mesmo email", async()=> {
            const response = await request(app).post("/users").send({
                email: "janio@example.com",
                name: "User Example" 
        });
            expect (response.status).toBe(400);
        });
});
