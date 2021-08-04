import { CategoriesService } from "../services/CategoriesService";
import { Request, Response } from "express";

export class CategoriesController {

    async save(req: Request, res: Response): Promise<Response>{

        const objCategory = {...req.body}
        const categoriesService = new CategoriesService()
        try{
            const category = await categoriesService.create(objCategory, objCategory.name)
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

    async getCategories(req: Request, res: Response): Promise<Response>{
        const categoriesService = new CategoriesService()
        try{
            const categories = await categoriesService.getCategories()
            return res.json(categories)
        }catch(err){
            return res.json(err.message)
        }
    }

    async getById(req: Request, res: Response): Promise<Response>{
        const { id } = req.body
        const categoriesService = new CategoriesService()
        try{
            const category = await categoriesService.getById(id)
            return res.json(category)
        }catch(err){
            return res.json(err.message)
        }
    }

    async updateCategory(req: Request, res: Response): Promise<Response>{
        const { name, id } = req.body
        const categoriesService = new CategoriesService()
        try{
            const category = await categoriesService.update(name, id)
            return res.json(category)
        }catch(err){
            return res.json(err.message)
        }
    }
}