import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm"
import { v4 as uuid } from "uuid"
import { MaxLength, MinLength } from "class-validator"

@Entity("categories")
export class Category{
    
    @PrimaryColumn()
    id!: string;

    @Column()
    @MinLength(2, {message: "Não atende à quantidade mínima de 2 carácteres."})
    @MaxLength(50, {message: "Ultrapassou a quantidade máxima de 50 carácteres."})
    name!: string;

    @ManyToOne(type => Category, category => category.childCategories)
    parent_id!: Category;

    @OneToMany(type => Category, category => category.parent_id)
    childCategories!: Category[];

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