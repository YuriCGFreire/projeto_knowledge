import { Request, Response } from "express";

export class UsersController {

    async findUser(req: Request, res: Response): Promise<Response>{
        return res.json({ "Message: ": "Apenas um exemplo de metodo" })
    }

}