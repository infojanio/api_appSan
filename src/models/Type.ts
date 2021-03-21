import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable } from "typeorm";
import { v4 as uuid } from 'uuid';

import Point from '../models/Point';

@Entity("types")
class Type {

    @PrimaryGeneratedColumn('uuid')
    //readonly -> quem acessar User, não conseguirá alterar o valor do "id"
    readonly id: string;


  /* modo gostack

*/

    @Column()
    image: string;

    @Column()
    title: string;


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

export default Type;
