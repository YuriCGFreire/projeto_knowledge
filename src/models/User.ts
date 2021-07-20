import { Column, Entity, PrimaryColumn } from "typeorm"
import {v4 as uuid} from "uuid"

@Entity()
export class User{
    @PrimaryColumn()
    id!: string;

    @Column()
    name!: string;
}