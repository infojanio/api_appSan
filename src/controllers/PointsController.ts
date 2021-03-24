import { request, Request, Response } from 'express';
import { getCustomRepository, getRepository } from 'typeorm';
import Point from '../models/Point';
import PointsRepository from '../repositories/PointsRepository';
import FindPointsByCityService from '../services/FindPointsByCityService';

//padrão de uso de métodos, index(listar todos), show (listar 1 especifico), create(criar), update e delete


class PointController {

  //método para salvar
  async create(request: Request, response: Response) {
    const { userId, typeId, date, meter, image, latitude, longitude, city, uf, status } = request.body;
    const pointsRepository = getCustomRepository(PointsRepository);

    //Não permite que salvamos usuários com email repetido
    const pointAlreadyExists = await pointsRepository.findOne({ meter })  //findOne({email}) => SELECT * FROM USERS WHERE EMAIL = "EMAIL"

    const point = pointsRepository.create({
      userId,
      typeId,
      date,
      meter,
      image,
      latitude,
      longitude,
      city,
      uf,
      status,
    });

    //verifica se o ponto já existe
    if (pointAlreadyExists) {
      return response.status(400).json({
        error: "Já existe ocorrência para este hidrômetro!",
      })
    }

    await pointsRepository.save(point);

    return response.status(201).json(point);
  }


  public async filter(request: Request, response: Response): Promise<Response> {
    const { city } = request.params;

    const findPointsByCity = new FindPointsByCityService();

  const points = await findPointsByCity.execute({ city });

  console.log(points);
  return response.json(points);

  }

/*

pointsRouter.get('/list/:city', async (request, response) => {
  const { city } = request.params;
  const findPointsByCity = new FindPointsByCityService();

  const points = await findPointsByCity.execute({ city });

  console.log(points);
  return response.json(points);

});
//cria pontos de vazamento
pointsRouter.post('/', pointsController.create);
*/


  //método para listar
  async index(request: Request, response: Response) {
    try {
    const pointsRepository = getCustomRepository(PointsRepository);

    const points = await pointsRepository.find();

      return response.json(points);
    } catch (err) {
      return response.status(400).json({ err: "Erro ao listar os pontos de vazamento!" });

    }
  }

  //Lista 1 ponto específico
  async show(request: Request, response: Response) {
    try {
      const { id } = request.params;
    const pointsRepository = getCustomRepository(PointsRepository);
    const point = await pointsRepository.findOne(id);

      return response.json(point);
    } catch (err) {
      return response.status(400).json({ err: "Erro ao listar o ponto de vazamento!" });

    }
}


}

export default PointController;
