import express from 'express';
import cors from 'cors';
import {isAuth} from './auth.js';
import {protectedRoutes} from './routes.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use(isAuth({authRequired: true}));
protectedRoutes(app);

export default app;
