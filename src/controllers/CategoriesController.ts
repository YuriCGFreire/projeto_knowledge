import { CategoriesService } from "../services/CategoriesService";
import { Request, Response } from "express";
import { ObjectFlags } from "typescript";

export class CategoriesController {

    async createOrUpdate(req: Request, res: Response): Promise<Response>{
        const objCategory = {...req.body}
        const categoriesService = new CategoriesService()
        const {id} = req.params

        if(req.params.id){
            objCategory.id = id
            try{
                const category = await categoriesService.createOrUpdate(objCategory)
                return res.json(category)
            }catch(err){
                return res.json(err.message)
            }
        }

        try{
            const category = await categoriesService.createOrUpdate(objCategory)
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
        const { id } = req.params

        const categoriesService = new CategoriesService()
        try{
            const category = await categoriesService.getById(id)
            return res.json(category)
        }catch(err){
            return res.json(err.message)
        }
    }
}