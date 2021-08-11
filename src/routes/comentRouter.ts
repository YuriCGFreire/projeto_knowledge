import { Router } from "express";
import { ComentsController } from "../controllers/ComentsController";
const comentRouter = Router()
const comentsController = new ComentsController()

comentRouter.post("/", comentsController.createOrUpdate)
comentRouter.put("/:id", comentsController.createOrUpdate)
comentRouter.delete("/", comentsController.delete)