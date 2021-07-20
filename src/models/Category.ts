import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm"
import { v4 as uuid } from "uuid"

@Entity("categories")
export class Category{
    
    @PrimaryColumn()
    id!: string;

    @Column()
    name!: string;

    @JoinColumn({name: "parent_id"})
    @OneToOne(type => Category)
    user!: Category;

    @Column()
    parent_id!: string;

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