import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRouter.js';
import orderRouter from './routes/orderRouter.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';
import cookieParser from 'cookie-parser';

const app = express();

const mongoUrl = process.env.MONGO_DB_URI;
mongoose.connect(mongoUrl, {});
const connection = mongoose.connection;

connection.once('open', () => {
    console.log('connection established successfully');
});

const connectSrc = [
  "'self'",
  ...(process.env.NODE_ENV === "development" ? ["http://localhost:5050"] : []),
];

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
        ],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
        ],
        imgSrc: [
          "'self'",
          "data:",
          "https://udaulbhdeheocmduvmtn.supabase.co", 
        ],
        fontSrc: ["'self'"],
        connectSrc,
        frameSrc: ["'none'"], 
      },
    },
    crossOriginOpenerPolicy: { policy: "same-origin" },
    crossOriginResourcePolicy: { policy: "same-origin" },
  })
);

// Global Rate Limiter
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true, 
  legacyHeaders: false, 
  message: {
    status: 429,
    message: "Too many requests from this IP, please try again later."
  },
});

// Apply to all requests
app.use(globalLimiter);

// Specific limiter for sensitive routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, 
  message: {
    status: 429,
    message: "Too many login attempts, please try again later."
  },
  standardHeaders: true,
  legacyHeaders: false,
});



app.use(bodyParser.json())
app.use(cors(
    {
  origin: "http://localhost:5173",
  credentials: true
}
));

app.use((req, res, next) => {
    const token = req.header('Authorization')?.replace("Bearer ", "");
    console.log(token)

    if (token != null) {
        jwt.verify(token, process.env.SECRET, (error, decoded) => {
            if (!error) {
                req.user = decoded;
            }
        })
    }
    next();
})

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);


app.listen(5050, () => {
    console.log('Server is running on port 5050');
});





