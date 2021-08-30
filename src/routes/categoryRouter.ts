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


/* 
admin: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgwMWI5NjgyLTkyMjAtNGUxNS05ZGM1LTI4MTk4ZTZiYjZhNCIsIm5hbWUiOiJZdXJpIEZyZWlyZSIsImVtYWlsIjoieXVyaThAdGVzdGUuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTYzMDMzNDU0NiwiZXhwIjoxNjMwNTkzNzQ2fQ.o_kFsHsXh3eYVUf59oN1Iart_6xeaqZerZsDmIq9BZs

noAdmin: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAyMTMxM2E5LWZkNjgtNGQzNi04YjkwLTI1NzQ4N2UwMmFjOSIsIm5hbWUiOiJZdXJpIEZyZWlyZSIsImVtYWlsIjoieXVyaTdAdGVzdGUuY29tIiwiYWRtaW4iOmZhbHNlLCJpYXQiOjE2MzAzMzQ3NzgsImV4cCI6MTYzMDU5Mzk3OH0.Stjnve8gm14wgXg6csQ8o00MQn87V2hDwrCT9rqTrc4

*/