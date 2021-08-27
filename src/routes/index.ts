import { Router } from "express";
import { articleRouter } from "./articleRouter";
import { categoryRouter } from "./categoryRouter";
import { comentRouter } from "./comentRouter";
import { userRouter, signupRouter } from "./userRouter";
import { authRouter} from "./authRouter";
import authMiddleware from "../middlewares/authMiddlewares"

const routes = Router()


//Não vão precisar do middleware
routes.use("/signup", signupRouter)
routes.use("/signin", authRouter)

//Vão precisar do middleware
routes.use("/user", authMiddleware,userRouter)
routes.use("/category", authMiddleware,categoryRouter)
routes.use("/article", authMiddleware,articleRouter)
routes.use("/coment", authMiddleware,comentRouter)

export {routes}