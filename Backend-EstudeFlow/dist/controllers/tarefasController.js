"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tarefasController = void 0;
const models_1 = __importDefault(require("../models"));
function isPrismaClientKnownRequestError(error) {
    return typeof error === 'object' && error !== null && 'code' in error;
}
exports.tarefasController = {
    async listar(req, res) {
        try {
            if (!req.usuario) {
                return res.status(401).json({ error: 'Usuário não autenticado' });
            }
            const tarefas = await models_1.default.tarefa.findMany({
                where: { usuarioId: req.usuario.id },
                include: { unidade: true },
            });
            return res.json(tarefas);
        }
        catch (error) {
            console.error('Erro ao listar tarefas:', error);
            return res.status(500).json({ error: 'Erro ao listar tarefas' });
        }
    },
    async obter(req, res) {
        try {
            if (!req.usuario) {
                return res.status(401).json({ error: 'Usuário não autenticado' });
            }
            const { id } = req.params;
            const tarefa = await models_1.default.tarefa.findFirst({
                where: {
                    id: Number(id),
                    usuarioId: req.usuario.id,
                },
                include: { unidade: true },
            });
            if (!tarefa) {
                return res.status(404).json({ error: 'Tarefa não encontrada' });
            }
            return res.json(tarefa);
        }
        catch (error) {
            console.error('Erro ao obter tarefa:', error);
            return res.status(500).json({ error: 'Erro ao obter tarefa' });
        }
    },
    async criar(req, res) {
        try {
            if (!req.usuario) {
                return res.status(401).json({ error: 'Usuário não autenticado' });
            }
            const { nome, dataEntrega, unidadeId } = req.body;
            if (!nome || !dataEntrega || !unidadeId) {
                return res.status(400).json({ error: 'Dados incompletos' });
            }
            const unidade = await models_1.default.unidade.findUnique({
                where: { id: unidadeId },
            });
            if (!unidade) {
                return res.status(404).json({ error: 'Unidade não encontrada' });
            }
            const tarefa = await models_1.default.tarefa.create({
                data: {
                    nome,
                    dataEntrega: new Date(dataEntrega),
                    usuarioId: req.usuario.id,
                    unidadeId,
                    status: 'Pendente',
                },
            });
            return res.status(201).json(tarefa);
        }
        catch (error) {
            console.error('Erro ao criar tarefa:', error);
            if (isPrismaClientKnownRequestError(error) && error.code === 'P2002') {
                return res.status(400).json({ error: 'Já existe uma tarefa com este nome' });
            }
            return res.status(500).json({ error: 'Erro ao criar tarefa' });
        }
    },
    async atualizar(req, res) {
        try {
            if (!req.usuario) {
                return res.status(401).json({ error: 'Usuário não autenticado' });
            }
            const { id } = req.params;
            const { nome, dataEntrega, status, unidadeId } = req.body;
            const tarefaExistente = await models_1.default.tarefa.findFirst({
                where: {
                    id: Number(id),
                    usuarioId: req.usuario.id,
                },
            });
            if (!tarefaExistente) {
                return res.status(404).json({ error: 'Tarefa não encontrada' });
            }
            if (unidadeId) {
                const unidade = await models_1.default.unidade.findUnique({
                    where: { id: unidadeId },
                });
                if (!unidade) {
                    return res.status(404).json({ error: 'Unidade não encontrada' });
                }
            }
            const tarefaAtualizada = await models_1.default.tarefa.update({
                where: { id: Number(id) },
                data: {
                    nome: nome ?? undefined,
                    dataEntrega: dataEntrega ? new Date(dataEntrega) : undefined,
                    status: status ?? undefined,
                    unidadeId: unidadeId ?? undefined,
                },
            });
            return res.json(tarefaAtualizada);
        }
        catch (error) {
            console.error('Erro ao atualizar tarefa:', error);
            return res.status(500).json({ error: 'Erro ao atualizar tarefa' });
        }
    },
    async excluir(req, res) {
        try {
            if (!req.usuario) {
                return res.status(401).json({ error: 'Usuário não autenticado' });
            }
            const { id } = req.params;
            const tarefaExistente = await models_1.default.tarefa.findFirst({
                where: {
                    id: Number(id),
                    usuarioId: req.usuario.id,
                },
            });
            if (!tarefaExistente) {
                return res.status(404).json({ error: 'Tarefa não encontrada' });
            }
            await models_1.default.tarefa.delete({
                where: { id: Number(id) },
            });
            return res.status(204).send();
        }
        catch (error) {
            console.error('Erro ao excluir tarefa:', error);
            return res.status(500).json({ error: 'Erro ao excluir tarefa' });
        }
    },
};
