import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

//retorna todos os pontos de vazamento
sessionsRouter.post('/', async(request, response)=> {
    try {
        const { matricula, password } = request.body;

        const authenticateUser = new AuthenticateUserService();

        const { user } = await authenticateUser.execute({
            matricula,
            password,
        });
        //retirar o retorno da senha 
        delete user.password;

       response.json({user}); 
       
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
    
});

 export default sessionsRouter;