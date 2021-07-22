import { Router } from "express";
import { categoryRouter } from "./categoryRouter";
import { userRouter } from "./userRouter";
const routes = Router()

routes.use("/user", userRouter)
routes.use("/category", categoryRouter)

export {routes}