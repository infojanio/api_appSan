import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

@Entity("users")
class User {

    @PrimaryGeneratedColumn('uuid')
    //readonly -> quem acessar User, não conseguirá alterar o valor do "id"
    readonly id: string;

    @Column()
    name: string;

    @Column()
    matricula: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    whatsapp: string;

    @Column()
    avatar: string;

    
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

export default User;