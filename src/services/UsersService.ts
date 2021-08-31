import { UserRepository,} from "../repositories/UserRepository";
import {Repository, getCustomRepository} from "typeorm"
import { User } from "../models/User";
import { validate } from "class-validator";
import { Article } from "../models/Article";
import { ArticleRepository } from "../repositories/ArticleRepository";

interface IUserInterface{
    name: string, 
    email: string,
    password: string,
    admin: boolean
}

export class UsersService{
    private usersRepository: Repository<User>
    private articlesRepositore: Repository<Article>

    constructor(){
        this.usersRepository = getCustomRepository(UserRepository)
        this.articlesRepositore = getCustomRepository(ArticleRepository)
    }

    async create({name, email, password, admin}: IUserInterface){

        const userExists = await this.usersRepository.findOne({ email })
        if(userExists){
            const msg = `Usuário já cadastrado.`
            return msg
        }
        
        const user = this.usersRepository.create({
            name,
            email, 
            password,
            admin
        })

        const errors = await validate(user)

        if(errors.length == 0){
            await this.usersRepository.save(user)
            const savedUser = await this.usersRepository.findOne({
                select: ["name", "email", "admin", "id"],
                where: {email}
            })
            return savedUser
        }else{
            return errors
        }
        
    }
    //criar método getAllUsers, updateUser, getUserByEmail

    async getAllUsers(page: number){
        const limit:number = 10
        const [users, total] = await this.usersRepository.findAndCount({
            select: ["name", "email", "admin", "id"],
            take: limit, //número máximo de entidades que devem ser retornado
            skip: page * limit - limit, //a partir de qual entidade as outras entidades devem ser carregadas
            where: {deleted_at: null}
        })

        return {data: users, limit, count: total, page: page}
    }

    async getByEmail(email: string){
        const user = await this.usersRepository.find({
            select: ["name", "email", "admin", "id"],
            where: {email: email, deleted_at: null}
        })

        return user
    }

    async updateUser(name: string, email:string, id: string){
        await this.usersRepository
            .createQueryBuilder()
            .update(User)
            .set({name: name, email: email})
            .where({id})
            .execute()

        const user = await this.usersRepository.find({
            select: ["name", "email", "admin", "id"],
            where: {email}
        })

        return user
    }

    async softDeleteUser(id: string){
        const user = await this.usersRepository.find({
            where: {id}
        })

        const articles = await this.articlesRepositore.findOne({
            where: {user_id: id}
        })

        if(!user){
            const msg = "Usuário não cadastrado" 
            return msg
        }
        
        if(articles){
            const msg = "Usuário possui artigos."
            return msg
        }
        
        const msg = "Usuário excluido."
        await this.usersRepository
            .createQueryBuilder()
            .softDelete()
            .where({ id })

        return msg

    }
}