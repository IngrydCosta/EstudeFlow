"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const tarefas_1 = __importDefault(require("./routes/tarefas"));
const unidades_1 = __importDefault(require("./routes/unidades"));
const autenticacao_1 = __importDefault(require("./routes/autenticacao"));
const errorHandler_1 = require("./middlewares/errorHandler");
dotenv_1.default.config();
const app = (0, express_1.default)();
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
app.use((0, cors_1.default)(corsOptions));
app.options('*', (0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((req, res, next) => {
    console.log(`Rota chamada: ${req.method} ${req.path}`);
    next();
});
console.log('Registrando rota /api/tarefas');
app.use('/api/tarefas', tarefas_1.default);
console.log('Registrando rota /api/unidades');
app.use('/api/unidades', unidades_1.default);
console.log('Registrando rota /api/autenticacao');
app.use('/api/autenticacao', autenticacao_1.default);
app.get('/', (req, res) => {
    res.send('API do EstudeFlow funcionando!');
});
app.use(errorHandler_1.errorHandler);
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
