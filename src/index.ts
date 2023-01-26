import express from 'express';
import cors from 'cors';
import { isAuth } from './auth.js';
import { protectedRoutes } from './routes.js';


const app = express();
app.use(express.json());
app.use(cors());
const authCallback: any = isAuth({ authRequired: true });
app.use(authCallback);
protectedRoutes(app);

export default app;
