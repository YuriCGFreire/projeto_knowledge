import { Request, Response } from "express";
import { UsersService } from "../services/UsersService";

export class UsersController {

    async save(req: Request, res: Response): Promise<Response>{
        const {name, email, password, confirmPassword} = req.body
        const usersService = new UsersService()
        
        if(password != confirmPassword){
            res.json({"Message: ": "Senhas não conferem."})
        }

        try{
            const user = await usersService.create({ name, email, password })
            return res.json({user})            
        }catch(err){
            return res.json(err.message)
        }
    }

}