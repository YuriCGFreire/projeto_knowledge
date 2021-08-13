import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";

export class AuthController{

    async signin(req: Request, res: Response): Promise<Response>{
        const userData = {...req.body}
        const authService = new AuthService()
        if(!userData.email || !userData.password){
            return res.json("Email ou senha inválidos.")
        }
        try{
            const signin = await authService.signin(userData)
            return res.json(signin)
        }catch(error){
            return res.json(error.message)
        }
    }
    
}