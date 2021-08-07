import { CategoriesController } from "../controllers/CategoriesController";
import { Router } from "express";
const categoryRouter = Router()
const categoriesController = new CategoriesController()

categoryRouter.get("/:id", categoriesController.getById)
categoryRouter.post("/", categoriesController.createOrUpdate)
categoryRouter.delete("/:id", categoriesController.delete)
categoryRouter.get("/", categoriesController.getCategories)
categoryRouter.put("/:id", categoriesController.createOrUpdate)

export {categoryRouter}