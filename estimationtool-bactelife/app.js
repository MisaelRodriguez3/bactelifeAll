import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import productsRoutes from './routes/product.routes.js';
import AuthRoutes from './routes/auth.routes.js';
import emailRoutes from './routes/email.routes.js'
import { FRONT_URL } from './config.js';
import cors from 'cors';
import path from 'path'
import history from 'connect-history-api-fallback';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors({ origin: FRONT_URL, credentials: true }));
app.use(history());

// Middleware para servir archivos estáticos desde la carpeta 'public'
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use('/api', AuthRoutes);
app.use('/api', productsRoutes);
app.use('/api', emailRoutes);
export default app;