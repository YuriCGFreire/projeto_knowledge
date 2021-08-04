import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm"
import { v4 as uuid } from "uuid"
import { Category } from "./Category";
import { User } from "./User";
import { Coment } from "./Coment";

@Entity("articles")
export class Article{
    @PrimaryColumn()
    id!: string;

    @Column()
    name!: string;

    @Column()
    description!: string;

    @Column()
    image_url!: string;

    @Column({type: "text"})
    content!: string;

    @ManyToOne(type => User, article => Article)
    @JoinColumn({ name: "user_id" })
    user!: User;

    @Column()
    user_id!: string;

    @ManyToOne(() => Category, article => Article)
    @JoinColumn({ name: "category_id" })    
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