import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm"
import {v4 as uuid} from "uuid"
import { IsEmail, MaxLength, MinLength } from "class-validator"

@Entity()
export class User{
    @PrimaryColumn()
    id!: string;

    @Column()
    @MinLength(3, {message: "Um nome precisa ter pelo menos 3 carácteres."})
    @MaxLength(50, {message: "Um nome precisa ter no max 50 carácteres."})
    name!: string;

    @Column()
    @IsEmail()
    email!: string;

    @Column()
    @MinLength(6, {message: "A senha precisa ter no mínimo 6 carácteres."})
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

        if(this.admin == null){
            this.admin = false 
        }
    }
}