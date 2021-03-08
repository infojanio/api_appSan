import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import User from './User';
import { v4 as uuid } from 'uuid';

@Entity("points")
class Point {
    

    @PrimaryGeneratedColumn('uuid')
    //readonly -> quem acessar User, não conseguirá alterar o valor do "id"
    readonly id: string;

    @Column()
    provider_id: string; // Relacionamento que pega o prestador pelo id

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



    /* Relacionamento entre tabelas
Um para um (OneToOne)
Um para muitos (OneToMany)
Muitos para muitos (ManyToMany)
*/
// atenção: como estamos dentro Points, então a relação será ManyToOne

/*

  
    @ManyToOne(() => User // Muitas marcações de pontos para um prestador
    @JoinColumn({ name: 'provider_id' })
    provider: User;
  
    @Column()
    user_id: string; // Relacionamento que pega o prestador pelo id
  
    @ManyToOne(() => User) // Muitos agendamentos para um prestador
    @JoinColumn({ name: 'user_id' })
    user: User;
*/

