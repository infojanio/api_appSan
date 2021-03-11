import { EntityRepository, Repository } from "typeorm";
import Point from "../models/Point";


@EntityRepository(Point) 
class PointsRepository extends Repository<Point> {
    
  //Métodos da classe
  //Buscar por data
  public async findByDate(date: Date): Promise<Point | null> {
      const findPoint = await this.findOne({
          where: { date },
      });
      return findPoint || null;
  }
  
} 
export default PointsRepository;
