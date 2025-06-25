import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import tarefasRoutes from './routes/tarefas';
import unidadesRoutes from './routes/unidades';
import autenticacaoRoutes from './routes/autenticacao';
import { errorHandler } from './middlewares/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

console.log('Variáveis de ambiente:', {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL,
});

const corsOptions = {
  origin: 'http://localhost:5175',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  console.log(`Rota chamada: ${req.method} ${req.path}`);
  next();
});

// console.log('Registrando rota /api/tarefas');
// app.use('/api/tarefas', tarefasRoutes);
// console.log('Registrando rota /api/unidades');
// app.use('/api/unidades', unidadesRoutes);
// console.log('Registrando rota /api/autenticacao');
// app.use('/api/autenticacao', autenticacaoRoutes);

// app.get('/', (req, res) => {
//   res.send('API do EstudeFlow funcionando!');
// });

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});