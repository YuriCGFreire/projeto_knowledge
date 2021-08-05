import { Repository, getCustomRepository } from "typeorm";
import { Article } from "../models/Article";
import { ArticleRepository } from "../repositories/ArticleRepository";
import {validate} from "class-validator"

interface IcreateArticle{
    id?: string,
    name: string,
    description: string,
    image_url: string,
    content: string,
    category_id?: string,
    user_id?: string
}

export class ArticlesService {
    private articleRepository: Repository<Article>

    constructor(){
        this.articleRepository = getCustomRepository(ArticleRepository)
    }

    async createOrUpdate(objArticle:IcreateArticle){ //Método responsável por criar ou atualizar artigo
        const article = {...objArticle}
        this.articleRepository.create(article)
        const errors = await validate(article)

        if(article.id){//Caso eu receba o id, farei um update
            if(errors.length == 0){
                const {id, name, description, image_url, content} = article
                await this.articleRepository
                    .createQueryBuilder()
                    .update(Article)
                    .set({name, description, image_url, content})
                    .where({id})
                    .execute()
                return article
            }else{
                return errors
            }
        }

        if(errors.length == 0){
            await this.articleRepository.save(article)
            return article 
        }else{
            return errors
        }

    }
}