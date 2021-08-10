import { Repository, getCustomRepository } from "typeorm";
import { Category } from "../models/Category";
import { CategoryRepository } from "../repositories/CategoryRepository";
import { validate } from "class-validator";
import { Article } from "../models/Article";
import { ArticleRepository } from "../repositories/ArticleRepository";

interface ICategoryCreate{
    id: string,
    name: string
}

export class CategoriesService {
    private categoryRepository: Repository<Category>
    private articleRepository: Repository<Article>

    constructor(){
        this.categoryRepository = getCustomRepository(CategoryRepository)
        this.articleRepository = getCustomRepository(ArticleRepository)
    }

    async createOrUpdate(objCategory:ICategoryCreate){
        const { id, name } = objCategory
        const categoryExists = await this.categoryRepository.findOne(name)
        const category = this.categoryRepository.create(objCategory)
        const errors = await validate(category)

        if(categoryExists){ //Verifico se a categoria existe.
            const msg = "Categoria já cadastrada."
            return msg
        }

        if(objCategory.id){ //Se tiver o id nos parametros, então eu faço um update ao invés de criar uma categoria  
            if(errors.length == 0){
                await this.categoryRepository
                    .createQueryBuilder()
                    .update(Category)
                    .set({name: name})
                    .where({id})
                    .execute()
                
                const category = await this.categoryRepository.find({
                    select: ["name"],
                    where: {id}
                })
                return category
            }else{
                return errors
            }         
        }

        if(errors.length == 0){
            await this.categoryRepository.save(category)
            return category
        }else{
            return errors
        } 
    }

    async remove (id: string){
        const article = await this.articleRepository.find({
            select: ["category_id"],
            where: {category_id: id}
        })  
        
        if(article.length != 0){
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

    async getCategories(page:number){
        const limit = 10
        const [categories, total] = await this.categoryRepository.find({
            select: ["id", "name"],
            take: limit, 
            skip: page * limit - limit
        })
        return { data: categories, limit, count: total, page: page }
    }

    async getById(id: string){
        const category = await this.categoryRepository.findOne({
            select: ["name", "id"],
            where: {id}
        })
        return category
    }
}