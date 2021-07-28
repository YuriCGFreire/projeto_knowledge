import { CategoriesController } from "../controllers/CategoriesController";
import { Router } from "express";
const categoryRouter = Router()
const categoriesController = new CategoriesController()

categoryRouter.post("/", categoriesController.save)
categoryRouter.delete("/:id", categoriesController.delete)
categoryRouter.get("/byid", categoriesController.getById)
categoryRouter.get("/", categoriesController.getCategories)

export {categoryRouter}