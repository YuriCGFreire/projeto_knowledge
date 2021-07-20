import { UserRepository,} from "../repositories/UserRepository";
import {Repository, getCustomRepository} from "typeorm"
import { validate } from "class-validator";
import { User } from "../models/User";

interface IUsersInterface{
    name: string,
    email: string,
    password: string
}

export class UsersService{
    private usersRepository: Repository<User>

    constructor(){
        this.usersRepository = getCustomRepository(UserRepository)
    }

    async create({name, email, password}: IUsersInterface){

        const userExists = await this.usersRepository.findOne({ email })
        if(userExists){
            const msg = `Usuário já cadastrado.`
            return msg
        }

        const user = this.usersRepository.create({
            name,
            email, 
            password
        })

        const errors = await validate(user)
        if(errors.length == 0){
            await this.usersRepository.save(user)
            return user
        }

    }
}