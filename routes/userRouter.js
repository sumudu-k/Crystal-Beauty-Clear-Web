import express from 'express';
import { createUser, googleLogin, loginUser, deleteUser } from '../controllers/userController.js';
import rateLimit from 'express-rate-limit';

const userRouter = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, 
  message: {
    status: 429,
    message: "Too many login attempts, please try again after 15 minutes."
  },
  standardHeaders: true, 
  legacyHeaders: false,
});

const createUserLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, 
  message: {
    status: 429,
    message: "Too many accounts created from this IP, please try again later."
  },
});


userRouter.post("/", createUserLimiter,createUser);
userRouter.post("/login",loginLimiter, loginUser)
userRouter.post("/google",loginLimiter, googleLogin)
userRouter.delete("/", deleteUser)
userRouter.delete("/:email", deleteUser)

export default userRouter;

