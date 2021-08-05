import { Router } from "express";
import { ArticlesController } from "../controllers/ArticlesController";
const articleRouter = Router()
const articlesController = new ArticlesController()

articleRouter.post('/', articlesController.createOrUpdate)
articleRouter.put('/:id', articlesController.createOrUpdate)

export { articleRouter }