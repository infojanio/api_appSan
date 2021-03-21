import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    ManyToMany,
    OneToMany,
    JoinTable} from "typeorm";

import User from './User';
import Type from "./Type";
import { v4 as uuid } from 'uuid';

@Entity("points") //quando usamos @Entity o construtor() é criado de forma automática
class Point {


    @PrimaryGeneratedColumn('uuid')
    //readonly -> quem acessar User, não conseguirá alterar o valor do "id"
    readonly id: string;

    @Column()
    userId: string; // Relacionamento que pega o prestador pelo id

    @ManyToOne(() => User, { eager: true }) // Muitos pontos para um prestador
    @JoinColumn({ name: 'userId' })
    user: User;



    @Column()
  typeId: string; // Relacionamento que pega o prestador pelo id

  @ManyToOne(() => Type, {eager: true})
  @JoinColumn({ name: 'typeId' })
  types: Type[];


  /* Relacionamento de PointTypes
    @Column()
    typeId: string; // Relacionamento que pega o prestador pelo id

    @ManyToOne (type => Type, point => Point, { eager: true })
    @JoinTable()
    types: Type[];
*/

  /*

  //relacionamento de Muitos pontos de vazamento para 1 usuário
  @ManyToOne(type => User, points => Point, { eager: true }) //usamos eager:true para carregar os dados da tabela secundária
  //@JoinColumn({name: "provider_id"}) //a chave estrangeira estará aqui
  user: User;


//Quando há relacionamento @ManyToMany cria-se tabela pivô
  // Este relacionamento cria a tabela PointTypes (id_point, id_type)
  //relacionamento de 1 usuário tem Muitos pontos de vazamento
  @OneToMany(type => Point, user => User)
  //@JoinColumn({ name: 'provider_id' })
  points: Point[]; //array de pontos de vazamentos


  @OneToMany(type => Type, point => Point)
  @JoinColumn()
  types: Type[];


  @Column()
  userId: string;

  @Column()
  typeId: string;

  */


    @Column('timestamp with time zone')
    date: Date;

    @Column()
    meter: string;

    @Column()
    image: string;

    @Column()
    latitude: number;


    @Column()
    longitude: number;

    @Column()
    city: string;

    @Column()
    uf: string;

    @Column()
    status: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    //faz a verificação se o id já existe, pois quando tivermos editando queremos usar o id existente
    constructor() {
        if(!this.id) {
            this.id = uuid()
        }
    }

}

export default Point;




