import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, } from "typeorm";
import { User } from "./User";
import { Article } from "./Article";
import {v4 as uuid} from "uuid"

@Entity("coments")
export class Coment{

    @PrimaryColumn()
    id!: string;

    @Column()
    content!: string;

    @JoinColumn({name: "user_id"})
    @ManyToOne(type => User, coment => Coment)
    user!: User;

    @Column()
    user_id!: string; 

    @JoinColumn({name: "article_id"})
    @ManyToOne(type => Article, coment => Coment)
    article!: Article;

    @Column()
    article_id!: string;

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