import { Connection, createConnection, getConnectionOptions } from "typeorm";

//verifica se o yarn vai apontar para jest test ou desenvolvimento, com variáveis de ambiente
export default async(name= 'default'): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions();   //teremos todas as informações do ormconfig 

//verifica se o comando é de test ou dev
    return createConnection(
        Object.assign(defaultOptions, {
            name,
            database: process.env.NODE_ENV === 'test' //usa o banco de test
            ? "test_nlw4"   //usa o banco padrão
            : defaultOptions.database 
        }),
    );
};