import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

//retorna todos os pontos de vazamento
sessionsRouter.post('/', async(request, response)=> {
   
        const { matricula, password } = request.body;

        const authenticateUser = new AuthenticateUserService();

        const { user, token } = await authenticateUser.execute({
            matricula,
            password,
        });
        //retirar o retorno da senha 
        delete user.password;

       response.json({user, token}); 
       
       
});

 export default sessionsRouter;