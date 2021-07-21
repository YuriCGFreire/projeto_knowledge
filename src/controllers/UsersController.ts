import { Request, Response } from "express";
import { genSaltSync, hashSync } from "bcrypt-nodejs"
import { UsersService } from "../services/UsersService";

export class UsersController {

    async save(req: Request, res: Response): Promise<Response>{
        const { name, email, bodyPassword, admin = false } = req.body
        const usersService = new UsersService()
        const encryptPassword = (password:string) => {
            const salt = genSaltSync(10)
            return hashSync(password, salt)
        }
        const password = encryptPassword(bodyPassword)
        try{
            const user = await usersService.create({name, email, password, admin})
            return res.json(user)            
        }catch(err){
            return res.json(err.message)
        }
    }

    async getAllUsers(req: Request, res: Response): Promise<Response>{
        const usersService = new UsersService()
        try{
            const users = await usersService.getAllUsers()
            return res.json(users)
        }catch(err){
            return res.json(err.message)
        }
        
    }

}