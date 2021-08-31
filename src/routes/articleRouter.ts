import { Router } from "express";
import { ArticlesController } from "../controllers/ArticlesController";
import adminMiddleware from "../middlewares/adminMiddleware";
const articleRouter = Router()
const articlesController = new ArticlesController()

//Usuário comum e admins conseguem acessar 
articleRouter.get("/:id", articlesController.getById)
articleRouter.get('/', articlesController.getArticles)

//Para acessar as rotas abaixo precisa ser admin
articleRouter.delete('/:id', adminMiddleware(articlesController.remove))
articleRouter.post('/', adminMiddleware(articlesController.createOrUpdate))
articleRouter.put("/:id", adminMiddleware(articlesController.createOrUpdate))
    

export { articleRouter }