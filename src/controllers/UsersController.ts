import { Request, Response } from "express";

export default class UsersController {

    async save(req: Request, res: Response): Promise<Response>{
        return res.json({ "Message: ": "Apenas um exemplo de metodo" })
    }

}