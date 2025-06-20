import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import tarefasRoutes from './routes/tarefas';
import unidadesRoutes from './routes/unidades';
import autenticacaoRoutes from './routes/autenticacao';
import { errorHandler } from './middlewares/errorHandler';

// Carrega variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());


// Rotas
app.use('/api/tarefas', tarefasRoutes);
app.use('/api/unidades', unidadesRoutes);
app.use('/api/autenticacao', autenticacaoRoutes);

// Rota padrão
app.get('/', (req, res) => {
  res.send('API do EstudeFlow funcionando!');
});

// Middleware de tratamento de erros
app.use(errorHandler);

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Servidor rodando na porta ${PORT}`);
});



