import { Binary, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm"
import { v4 as uuid } from "uuid"
import { User } from "./User";

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

    @Column()
    content!: string;

    @JoinColumn({ name: "user_id" })
    @ManyToOne(type => User, type => Article)
    user!: User;

    @Column()
    user_id!: string;

    @JoinColumn({ name: "category_id" })
    @OneToOne(type => Article)
    article!: string;

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