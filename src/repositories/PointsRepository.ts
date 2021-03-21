import { request } from "express";
import { EntityRepository, Repository, In } from "typeorm";
import Point from "../models/Point";


@EntityRepository(Point)
class PointsRepository extends Repository<Point> {

   private ormRepository: Repository<Point>;

            //Nos repositories abstraímos tudo que diz respeito a banco de dados
  //Buscar por data
  public async findByDate(date: Date): Promise<Point | null> {
      const findPoint = await this.findOne({
          where: { date },
      });
      return findPoint || null;
  }

//filtrar por cidade
  public async filterCity(city: string): Promise<Point | undefined> {

    const findPoint = await this.findOne({

   //CORRIGIR AQUI NÃO ESTÁ FILTRANDO POR CIDADE
      where: { city },
  });


    return findPoint || null;
}


}
export default PointsRepository;
