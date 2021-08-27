require("dotenv").config()
const brcrypt = require("bcrypt-nodejs")
import { getCustomRepository, Repository } from "typeorm"
import { User } from "../models/User"
import { sign } from "jsonwebtoken"
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
        
        const isMatch = await brcrypt.compareSync(password, user.password)
        
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
        }

        const token = sign(payload, process.env.AUTH_SECRET as any, {expiresIn: "3d"})
        
        return {
            ...payload,
            token
        }
    }
}

