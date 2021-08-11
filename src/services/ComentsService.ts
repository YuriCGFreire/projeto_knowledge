import { getCustomRepository, Repository } from "typeorm";
import { Coment } from "../models/Coment";
import { validate } from "class-validator";
import { ComentRepository } from "../repositories/ComentRepository";

interface ICreateComent {
    id?: string,
    user_id: string,
    article_id: string,
    content: string,
}

export class ComentsService {
    private comentRepository: Repository<Coment>

    constructor(){
        this.comentRepository = getCustomRepository(ComentRepository)
    }

    async createOrUpdateComent(objComent: ICreateComent){
        const coment = this.comentRepository.create(objComent)
        const errors = await validate(coment)
        if(objComent.id){
            if(errors.length == 0){
                const {id, content} = coment
                await this.comentRepository
                    .createQueryBuilder()
                    .update(Coment)
                    .set({ content })
                    .where({id})
                    .execute()
                return coment
            }else{
                return errors
            }
        }

        if(errors.length == 0){
            await this.comentRepository.save(coment)
            return coment
        }else{
            return errors
        }
    }

    async delete(id:string){
        const msg = "Comentário deletado."
        await this.comentRepository
            .createQueryBuilder()
            .delete()
            .from(Coment)
            .where({id})
            .execute()
        return msg
    }
}