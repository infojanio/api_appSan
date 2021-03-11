import { 
    Entity, 
    Column, 
    CreateDateColumn, 
    UpdateDateColumn, 
    PrimaryGeneratedColumn, 
    ManyToOne, 
    JoinColumn, 
    ManyToMany,
    OneToOne,
    OneToMany} from "typeorm";

import User from './User';
import Type from "./Type";
import { v4 as uuid } from 'uuid';

@Entity("points") //quando usamos @Entity o construtor() é criado de forma automática
class Point {
    

    @PrimaryGeneratedColumn('uuid')
    //readonly -> quem acessar User, não conseguirá alterar o valor do "id"
    readonly id: string;

    @Column()
    provider_id: string;

    @OneToOne(()=> User)  //muitos pontos de vazamentos para 1 prestador
    @JoinColumn({name: 'provider_id'})
    provider: User;

    @Column()
    type_id: string;

    @ManyToMany(()=> Type)  //Muitos pontos de vazamentos para muitos tipos de ocorrencia
    @JoinColumn({name: 'type_id'})
    type: Type;
   
    
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




