import { UsersController } from "../controllers/UsersController"
import { Router } from "express"
const userRouter = Router()
const usersController = new UsersController()

userRouter.get('/:name', usersController.findUser)

export {userRouter}