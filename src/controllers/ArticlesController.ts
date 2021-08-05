import { ArticleRepository } from "../repositories/ArticleRepository";
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
}