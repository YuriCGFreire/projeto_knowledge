import { CategoriesController } from "../controllers/CategoriesController";
import { Router } from "express";
const categoryRouter = Router()
const categoriesController = new CategoriesController()

categoryRouter.get("/byid", categoriesController.getById)
categoryRouter.post("/", categoriesController.save)
/* categoryRouter.delete("/:id", categoriesController.delete) */
categoryRouter.get("/", categoriesController.getCategories)
categoryRouter.put("/", categoriesController.updateCategory)

export {categoryRouter}