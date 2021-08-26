import { Router } from "express";
import { articleRouter } from "./articleRouter";
import { categoryRouter } from "./categoryRouter";
import { comentRouter } from "./comentRouter";
import { userRouter } from "./userRouter";
import { authRouter } from "./authRouter";

const routes = Router()

routes.use("/user", userRouter)
routes.use("/category", categoryRouter)
routes.use("/article", articleRouter)
routes.use("/coment", comentRouter)
routes.use("/login", authRouter)

export {routes}