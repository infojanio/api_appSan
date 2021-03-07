import { Entity, PrimaryColumn, Column, CreateDateColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

@Entity("surveys")
class Survey {
    @PrimaryColumn() //chave primária
    //readonly -> quem acessar User, não conseguirá alterar o valor do "id"
    readonly id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @CreateDateColumn() //coluna de data
    created_at: Date;

    constructor() {
        if(!this.id) {
            this.id = uuid()
        }
    }

}
export {Survey}