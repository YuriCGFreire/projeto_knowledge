import { Request, Response } from "express";
import { UsersService } from "../services/UsersService";

export class UsersController {

    async save(req: Request, res: Response): Promise<Response>{
        const { name, email, password, admin = null } = req.body
        const usersService = new UsersService()
        try{
            const user = await usersService.create({name, email, password, admin})
            return res.json(user)            
        }catch(err){
            return res.json(err.message)
        }
    }

}