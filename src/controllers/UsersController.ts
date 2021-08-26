import { Request, Response } from "express";
import { genSaltSync, hashSync } from "bcrypt-nodejs"
import { UsersService } from "../services/UsersService";

export class UsersController {

    async save(req: Request, res: Response): Promise<Response>{
        const user = {...req.body}
        const usersService = new UsersService()
        const encryptPassword = (password:string) => {
            const salt = genSaltSync(10)
            return hashSync(password, salt)
        }
        user.password = encryptPassword(user.password)
        try{
            const savedUser = await usersService.create({...user})
            return res.json(savedUser)            
        }catch(err){
            return res.json(err.message)
        }
    }

    async getAllUsers(req: Request, res: Response): Promise<Response>{
        const page:number = parseInt(req.query.page as any) || 1
        const usersService = new UsersService()
        try{
            const users = await usersService.getAllUsers(page)
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