import { UsersController } from "../controllers/UsersController"
import { Router } from "express"
const userRouter = Router()
const signupRouter = Router()
const usersController = new UsersController()

signupRouter.post("/", usersController.save)

userRouter.post('/', usersController.save)
userRouter.get('/', usersController.getAllUsers)
userRouter.get('/:email', usersController.getByEmail)
userRouter.put('/:id', usersController.updateUser)

export {userRouter, signupRouter}