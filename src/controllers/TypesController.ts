import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import TypesRepository from '../repositories/TypesRepository';
import CreateTypeService from '../services/CreateTypeService';

class TypeController {

  //método para salvar
  async create(request: Request, response: Response) {
    try {
      const { image, title } = request.body;

      const createType = new CreateTypeService();

      const type = await createType.execute({
        image,
        title,

      });

      return response.status(201).json(type);
    }
    catch (err) {
      return response.status(400).json({ err: "Erro ao cadastrar tipo de vazamento!" });
    }
  }

  async index(request: Request, response: Response) {
    try {
    const typesRepository = getCustomRepository(TypesRepository);
    const types = await typesRepository.find();

      return response.json(types);
    } catch (err) {
      return response.status(400).json({ err: "Erro ao listar o tipo de vazamento!" });

    }
}

}

export default TypeController;


