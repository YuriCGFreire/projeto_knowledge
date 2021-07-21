import { UserRepository,} from "../repositories/UserRepository";
import {Repository, getCustomRepository} from "typeorm"
import { User } from "../models/User";
import { validate } from "class-validator";

interface IUserInterface{
    name: string, 
    email: string,
    password: string,
    admin: boolean
}

export class UsersService{
    private usersRepository: Repository<User>

    constructor(){
        this.usersRepository = getCustomRepository(UserRepository)
    }

    async create({name, email, password, admin}: IUserInterface){

        const userExists = await this.usersRepository.findOne({ email })
        if(userExists){
            const msg = `Usuário já cadastrado.`
            return msg
        }

        
        const user = this.usersRepository.create({
            name,
            email, 
            password,
            admin
        })

        const errors = await validate(user)

        if(errors.length == 0){
            await this.usersRepository.save(user)
            const savedUser = await this.usersRepository.findOne({
                select: ["name", "email", "admin", "id"],
                where: {email}
            })
            return savedUser
        }else{
            return errors
        }
        
    }
    //criar método getAllUsers, updateUser, getUserByEmail

    async getAllUsers(){
        const allUsers = await this.usersRepository.find({
            select: ["name", "email", "admin", "id"]
        })

        return allUsers
    }

    async getByEmail(email: string){
        const user = await this.usersRepository.find({
            select: ["name", "email", "admin", "id"],
            where: {email}
        })

        return user
    }
}