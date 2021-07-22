import { CategoriesController } from "../controllers/CategoriesController";
import { Router } from "express";
const categoryRouter = Router()
const categoriesController = new CategoriesController()

categoryRouter.post("/", categoriesController.save)
categoryRouter.delete("/:id", categoriesController.delete)

export {categoryRouter}