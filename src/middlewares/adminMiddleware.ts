require("dotenv").config()
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface TokenPayload{
    id: string,
    name: string,
    email: string,
    admin: boolean,
    iat: number,
    exp: number
}

export default function adminMiddleware(middleware:any){
    return (req: Request, res: Response, next: NextFunction) => {
        const { authorization } = req.headers

        if(!authorization){
            return res.sendStatus(401)
        }
        
        const token = authorization.replace("Bearer", "").trim()

        try{
            const data = verify(token, process.env.AUTH_SECRET as any)
            const { admin } = data as TokenPayload
            req.admin = admin
            if(req.admin){
                middleware(req, res, next)
            }else{
                return res.sendStatus(401)
            }

        }catch{
            
        }
    }
}