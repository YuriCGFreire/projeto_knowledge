import { Repository, getCustomRepository } from "typeorm";
import { Category } from "../models/Category";
import { CategoryRepository } from "../repositories/CategoryRepository";
import { validate } from "class-validator";

export class CategoriesService {
    private categoryRepository: Repository<Category>

    constructor(){
        this.categoryRepository = getCustomRepository(CategoryRepository)
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

        

    }
}