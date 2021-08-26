require("dotenv").config()
import {decode, encode} from "jwt-simple"
import { compareSync } from "bcrypt-nodejs"
import { getCustomRepository, Repository } from "typeorm"
import { User } from "../models/User"
import { UserRepository } from "../repositories/UserRepository"


interface IUserSignIn{
    email:string,
    password:string
}

export class AuthService{
    
    private userRepository: Repository<User>

    constructor(){
        this.userRepository = getCustomRepository(UserRepository)
    }

    async signin({email, password}:IUserSignIn){
        const user = await this.userRepository.findOne({
            where: {email: email}
        })

        if(!user){
            const msg = "Usuário não cadastrado."
            return msg
        }

        const isMatch = compareSync(user.password, password)
        if(!isMatch){
            const msg = "Senha/Email inválidos."
            return msg
        }

        const now = Math.floor(Date.now() / 1000)

        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            admin: user.admin,
            iat: now,
            exp: now + (60 * 60 * 24 * 5)
        }

        return {
            ...payload,
            token: encode(payload, process.env.AUTH_SECRET as any)
        }
    }

}

