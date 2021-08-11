import { Router } from "express";
import { articleRouter } from "./articleRouter";
import { categoryRouter } from "./categoryRouter";
import { comentRouter } from "./comentRouter";
import { userRouter } from "./userRouter";

const routes = Router()

routes.use("/user", userRouter)
routes.use("/category", categoryRouter)
routes.use("/article", articleRouter)
routes.use("/coment", comentRouter)

export {routes}