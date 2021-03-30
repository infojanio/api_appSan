import { request } from "express";
import { EntityRepository, Repository } from "typeorm";
import Point from "../models/Point";


@EntityRepository(Point)
class PointsRepository extends Repository<Point> {

   private ormRepository: Repository<Point>;


  //filtrar por cidade
  public async findByType(typeId: string): Promise<Point | null> {
    const findType = await this.findOne({
      where: {
        typeId,
      },
    });
    return findType || null;
  }


            //Nos repositories abstraímos tudo que diz respeito a banco de dados
  //Buscar por data
  public async findByDate(date: Date): Promise<Point | null> {
      const findPoint = await this.findOne({
          where: { date },
      });
      return findPoint || null;
  }

}
export default PointsRepository;
