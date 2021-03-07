import {Request, Response} from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveysRepository } from '../repositories/SurveysRepository';
class SurveysController {

    //método para criação da pesquisa
    async create(request: Request, response: Response) {
        const { title, description } = request.body;

        const surveysRepository = getCustomRepository(SurveysRepository);

        const survey = surveysRepository.create({
            title,
            description
        });

        await surveysRepository.save(survey);
        return response.status(201).json(survey);
    }

    //método para listagem da pesquisa
    async show (request: Request, response: Response) {
        const surveysRepository = getCustomRepository(SurveysRepository);

        const all = await surveysRepository.find(); //find lista tudo 

        return response.json(all);
    }

}
export { SurveysController }