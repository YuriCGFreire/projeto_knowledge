import {Repository, EntityRepository} from "typeorm"
import { Article } from "../models/Article"

@EntityRepository(Article)
export class ArticleRepository extends Repository<Article>{}