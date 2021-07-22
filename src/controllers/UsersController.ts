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

    async getByEmail(req: Request, res: Response): Promise<Response>{
        const {email} = req.params
        const usersService = new UsersService()
        try{
            const user = await usersService.getByEmail(email)
            return res.json(user)
        }catch(err){
            return res.json(err.message)
        }
    }

    async updateUser(req: Request, res: Response): Promise<Response>{
        const { name, email } = req.body
        const {id} = req.params
        const usersService = new UsersService()
        try{
            const updatedUser = await usersService.updateUser(name, email, id)
            return res.json(updatedUser)
        }catch(err){
            return res.json(err.message)
        }

    }

}