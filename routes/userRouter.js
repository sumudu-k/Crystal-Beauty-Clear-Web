import express from 'express';
import { createUser, googleLogin, loginUser, deleteUser } from '../controllers/userController.js';

const userRouter = express.Router();

// create routes
userRouter.post("/", createUser);
userRouter.post("/login", loginUser)
userRouter.post("/google", googleLogin)
userRouter.delete("/", deleteUser)
userRouter.delete("/:email", deleteUser)

export default userRouter;

