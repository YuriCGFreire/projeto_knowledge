import { UsersController } from "../controllers/UsersController"
import { Router } from "express"
const userRouter = Router()
const usersController = new UsersController()

userRouter.post('/', usersController.save)
userRouter.get('/', usersController.getAllUsers)
userRouter.get('/:email', usersController.getByEmail)

export {userRouter}