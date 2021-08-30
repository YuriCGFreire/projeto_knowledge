import { CategoriesController } from "../controllers/CategoriesController";
import { Router } from "express";
import adminMiddleware from "../middlewares/adminMiddleware";
const categoryRouter = Router()
const categoriesController = new CategoriesController()

categoryRouter.get("/:id", categoriesController.getById)
categoryRouter.post("/", adminMiddleware(categoriesController.createOrUpdate))
categoryRouter.delete("/:id", adminMiddleware(categoriesController.delete))
categoryRouter.get("/", categoriesController.getCategories)
categoryRouter.put("/:id", adminMiddleware(categoriesController.createOrUpdate))

export {categoryRouter}


