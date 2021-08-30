import { Router } from "express";
import { ArticlesController } from "../controllers/ArticlesController";
import adminMiddleware from "../middlewares/adminMiddleware";
const articleRouter = Router()
const articlesController = new ArticlesController()

articleRouter.get('/', articlesController.getArticles)
articleRouter.delete('/:id', adminMiddleware(articlesController.remove))
articleRouter.post('/', adminMiddleware(articlesController.createOrUpdate))
articleRouter.put("/:id", adminMiddleware(articlesController.createOrUpdate))
articleRouter.get("/:id", articlesController.getById)
    

export { articleRouter }