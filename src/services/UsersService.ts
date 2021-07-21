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
            const returnedUser = {
                id: user.id,
                name: user.name,
                email: user.email,
                admin: user.admin
            }
            return returnedUser
        }else{
            return errors
        }
        
    }
}