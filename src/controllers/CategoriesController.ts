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

    async delete(req: Request, res: Response): Promise<Response>{
        const {id} = req.params
        const categoriesService = new CategoriesService()
        try{
            await categoriesService.remove(id)
            return res.json("Categoria deletada.")
        }catch(err){
            return res.json(err.message)
        }
    }

}