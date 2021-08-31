import { UsersController } from "../controllers/UsersController"
import { Router } from "express"
import adminMiddleware from "../middlewares/adminMiddleware"
const userRouter = Router()
const signupRouter = Router()
const usersController = new UsersController()

//Não precisa estar logado
signupRouter.post("/", usersController.save)


//Precisa estar logado
userRouter.put('/:id', usersController.updateUser)

//Precisa ser admin
userRouter.post('/', adminMiddleware(usersController.save))
userRouter.get('/', adminMiddleware(usersController.getAllUsers))
userRouter.get('/:email', adminMiddleware(usersController.getByEmail))
userRouter.delete('/:id', adminMiddleware(usersController.softDeleteUser))

export {userRouter, signupRouter}