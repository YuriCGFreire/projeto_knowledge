import { Router } from "express";
import { ArticlesController } from "../controllers/ArticlesController";
const articleRouter = Router()
const articlesController = new ArticlesController()

articleRouter.post('/', articlesController.createOrUpdate)
articleRouter.get('/', articlesController.getArticles)
articleRouter.put("/:id", articlesController.createOrUpdate)
articleRouter.get("/:id", articlesController.getById)
    

export { articleRouter }