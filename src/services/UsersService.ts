import { UserRepository,} from "../repositories/UserRepository";
import {Repository, getCustomRepository} from "typeorm"
import { User } from "../models/User";

interface IUsersInterface{
    
}

export class UsersService{
    private usersRepository: Repository<User>

    constructor(){
        this.usersRepository = getCustomRepository(UserRepository)
    }

    async create(){


    }
}