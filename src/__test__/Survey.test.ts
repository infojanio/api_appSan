import request from 'supertest';
import { app } from '../app';

import { Connection, getConnection } from 'typeorm';
import createConnection from "../database";


let connection: Connection;

describe ("Surveys", ()=> {

    //Roda as migrations antes de executar os testes para criar as tabelas
    beforeAll(async()=> {

        connection = await createConnection('test_nlw4');  
        
       
       await connection.query('DELETE FROM surveys');
        await connection.runMigrations(); 
    })

     
      afterAll(async () => {
        const mainConnection = getConnection();
    
        await connection.close();
        await mainConnection.close();
      });


      //Início dos testes
    //Testando a rota /users - criação de usuários
    it("Testa a criação de nova pesquisa", async()=> {
        const response = await request(app).post("/surveys").send({
            title: "Title example",
            description: "Description Example" 
    });
        expect (response.status).toBe(201);
        expect(response.body).toHaveProperty("id"); //espera receber o id da pesquisa
    });

    it("Testa se a pesquisa retorna todos os dados", async()=> {
            await request(app).post("/surveys").send({
            title: "Title example2",
            description: "Description Example2" 
    });

        const response = await request(app).get("/surveys");
        expect(response.body.length).toBe(2);  //espera o array com 2 ítens
    });
});
