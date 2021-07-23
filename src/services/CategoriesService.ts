import { Repository, getCustomRepository } from "typeorm";
import { Category } from "../models/Category";
import { CategoryRepository } from "../repositories/CategoryRepository";
import { validate } from "class-validator";
import { Article } from "../models/Article";
import { ArticleRepository } from "../repositories/ArticleRepository";

export class CategoriesService {
    private categoryRepository: Repository<Category>
    private articleRepository: Repository<Article>

    constructor(){
        this.categoryRepository = getCustomRepository(CategoryRepository)
        this.articleRepository = getCustomRepository(ArticleRepository)
    }

    async create(name: string){
        const categoryExists = await this.categoryRepository.findOne({ name })
        if(categoryExists){
            const msg = "Categoria já cadastrada."
            return msg
        }
        const category = this.categoryRepository.create({name})
        const errors = await validate(category)
        if(errors.length == 0){
            await this.categoryRepository.save(category)
            return category
        }else{
            return errors
        } 
    }

    async remove (id: string){

        const subCategory = await this.categoryRepository.find({
            select: ["parent_id"],
            where: {parent_id: id}
        })

        const article = await this.articleRepository.find({
            select: ["article_id"],
            where: {article_id: id}
        })  

        if(subCategory.length != 0){
            const msg = "Categoria possui subcategorias."
            return msg
        }else if(article.length != 0){
            const msg = "Categoria possui artigos."
            return msg
        }else{
            const msg = "Categoria deletada."            
            await this.categoryRepository
                .createQueryBuilder()
                .delete()
                .from(Category)
                .where({id})
                .execute() 
            return msg
        }   
    }
}