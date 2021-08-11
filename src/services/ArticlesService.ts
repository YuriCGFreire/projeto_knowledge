import { Repository, getCustomRepository } from "typeorm";
import { Article } from "../models/Article";
import { ArticleRepository } from "../repositories/ArticleRepository";
import {validate} from "class-validator"
import { ComentRepository } from "../repositories/ComentRepository";
import { Coment } from "../models/Coment";

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
    private comentRepository: Repository<Coment>

    constructor(){
        this.articleRepository = getCustomRepository(ArticleRepository)
        this.comentRepository = getCustomRepository(ComentRepository)
    }

    async createOrUpdate(objArticle:IcreateArticle){ //Método responsável por criar ou atualizar artigo
        const article = this.articleRepository.create(objArticle)
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

    async getArticles(page: number ){
        const limit:number = 10
        const [articles, total]:any = await this.articleRepository.findAndCount({
            select:["id", "name", "description"],
            take: limit,
            skip: page * limit - limit
        })

        return {data: articles, limit, count: total, page: page}
    }

    async getById(id:string){
        const {name, description, content, user, category}:any = await this.articleRepository.findOne({
            select: ["id", "name", "description", "content"],
            where: {id},
            relations: ["user", "category"] //retorna um user que tem relação com o artigo "puxado".
        })

        const {coment, userComent}:any = await this.comentRepository.find({ //Isso tem uma cara imensa de gambiarra. Pqp!
            select: ["content"],
            where: {article_id: id},
            relations: ["user"]
        })

        return {
            article: {id, category: category.name, name, description, content}, //propriedades do artigo
            author: {name: user.name, id: user.id}, //propriedades do autor do artigo
            coments: [ //Propriedades dos comentários
                {content: coment.content, user: userComent.name}
            ]
        }

    }

    async remove(id:string){
        const msg = "Artigo deletado."
        await this.articleRepository.createQueryBuilder()
            .delete()
            .from(Article)
            .where({id})
            .execute()
        return msg
    }
}