import {Request, Response} from "express"
import { ArticlesService } from "../services/ArticlesService";

export class ArticlesController {
    async createOrUpdate(req: Request, res: Response): Promise<Response>{
        const article = {...req.body}
        const articlesService = new ArticlesService()
        if(req.params.id){
            try{
                const id = req.params.id || undefined
                const {name, description, image_url, content} = article 
                await articlesService.createOrUpdate({id, name, description, image_url, content})
                return res.json(article)
            }catch(err){
                return res.json(err.message)
            }
        }

        try{
            const createdArticle = await articlesService.createOrUpdate(article)
            return res.json(createdArticle)
        }catch(err){
            return res.json(err.message)
        }

    }

    async getArticles(req: Request, res: Response): Promise<Response>{
        const articlesService = new ArticlesService()
        try{
            const articles = await articlesService.getArticles()
            return res.json(articles)
        }catch(err){
            return res.json(err.message)
        }
    }

    async getById(req: Request, res: Response): Promise<Response>{
        const articlesService = new ArticlesService()
        const id = req.params.id
        try{
            const article = await articlesService.getById(id)
            return res.json(article)
        }catch(err){
            return res.json(err.message)
        }
    }

    async remove(req: Request, res: Response): Promise<Response>{
        const id = req.params.id
        const articlesService = new ArticlesService()
        try{
            const articleDeleted = await articlesService.remove(id)
            return res.json(articleDeleted)
        }catch(err){
            return res.json(err.message)
        }
    }
}