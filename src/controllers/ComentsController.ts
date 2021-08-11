import {Request, Response} from "express"
import { ComentsService } from "../services/ComentsService"

export class ComentsController{

    async createOrUpdate(req: Request, res: Response): Promise<Response>{
        const coment = {...req.body}
        const comentsService = new ComentsService()
        if(req.params.id){ //pra atualizar comentário
            try{
                const id = req.params.id
                const {user_id, content, article_id} = coment
                await comentsService.createOrUpdateComent({ id, user_id, content, article_id })
                return res.json(coment)
            }catch(err){
                return res.json(err.message)
            }
        }

        try{
            await comentsService.createOrUpdateComent(coment)
            return res.json({ coment })
        }catch(err){
            return res.json(err.message)
        }
    }

    async delete(req: Request, res: Response): Promise<Response>{
        const id = req.body.id
        try{       
            const comentsService = new ComentsService()
            const comentDeleted = await comentsService.delete(id)
            return res.json(comentDeleted)
        }catch(err){
            return res.json(err.messgae)
        }
    }

}