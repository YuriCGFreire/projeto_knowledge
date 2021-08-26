import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";

export class AuthController{

    async signin(req: Request, res: Response): Promise<Response>{
        const {email, password} = req.body
        const authService = new AuthService()

        if(!email || !password){
            return res.json("Email ou senha inválidos.")
        }

        try{
            const userData = await authService.signin({email, password})
            return res.json(userData)
        }catch(error){
            return res.json(error.message)
        }
    }

}