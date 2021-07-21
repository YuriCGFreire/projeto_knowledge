import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm"
import { IsEmail, MaxLength, MinLength } from "class-validator"
import {v4 as uuid} from "uuid"

@Entity("users")
export class User{
    @PrimaryColumn()
    id!: string;

    @Column()
    @MinLength(3, {message: "Não atende a quantidade mínima de 3 carácteres."})
    @MaxLength(50, {message: "Ultrapassou a quantidade máxima de carácteres."})
    name!: string;

    @Column()
    @IsEmail()
    email!: string;

    @Column()
    @MinLength(8, {message: "Não atende a quantidade mínima de 8 carácteres."})
    password!: string;

    @Column()
    admin!: boolean;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;

    constructor(){
        if(!this.id){
            this.id = uuid()
        }
    }
}