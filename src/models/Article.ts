import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm"
import { v4 as uuid } from "uuid"
import { Category } from "./Category";
import { User } from "./User";
import { Coment } from "./Coment";
import { MaxLength, MinLength } from "class-validator";

@Entity("articles")
export class Article{
    @PrimaryColumn({type: "uuid"})
    id!: string;

    @Column()
    @MinLength(2, {message: "Não atende à quantidade mínima de 2 carácteres."})
    @MaxLength(20, {message: "Ultrapassou a quantidade máxima de 20 carácteres."})
    name!: string;

    @Column()
    @MinLength(10, {message: "Não atende à quantidade mínima de 10 carácteres."})
    @MaxLength(120, {message: "Ultrapassou a quantidade máxima de 120 carácteres."})
    description!: string;

    @Column()
    image_url!: string;

    @Column({type: "text"})
    content!: string;

    @JoinColumn({ name: "user_id" })
    @ManyToOne(type => User, article => Article)
    user!: User;

    @Column()
    user_id!: string;

    @JoinColumn({ name: "category_id" })    
    @ManyToOne(() => Category, article => Article)
    category!: Category;

    @Column()
    category_id!: string;

    @JoinColumn()
    @OneToMany(type => Coment, article => Article)
    coment!: Coment;

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