"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    console.error('Erro na aplicação:', err);
    if (err.name === 'ValidationError') {
        res.status(400).json({ error: err.message });
        return;
    }
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ error: 'Não autorizado' });
        return;
    }
    res.status(500).json({ error: 'Erro interno do servidor' });
};
exports.errorHandler = errorHandler;
