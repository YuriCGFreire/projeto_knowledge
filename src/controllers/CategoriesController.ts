import { CategoriesService } from "../services/CategoriesService";
import { Request, Response } from "express";

export class CategoriesController {

    async save(req: Request, res: Response): Promise<Response>{

        const {name} = req.body
        const categoriesService = new CategoriesService()
        try{
            const category = await categoriesService.create(name)
            return res.json(category)
        }catch(err){
            return res.json(err.message)
        }

    }

}