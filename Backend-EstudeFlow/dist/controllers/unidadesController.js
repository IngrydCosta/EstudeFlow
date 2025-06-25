"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unidadesController = void 0;
const models_1 = __importDefault(require("../models"));
const library_1 = require("@prisma/client/runtime/library");
exports.unidadesController = {
    // Listar todas as unidades
    listar: async (req, res) => {
        try {
            const unidades = await models_1.default.unidade.findMany();
            return res.json(unidades);
        }
        catch (error) {
            console.error('Erro ao listar unidades:', error);
            return res.status(500).json({ error: 'Erro ao listar unidades' });
        }
    },
    // Obter uma unidade específica
    async obter(req, res) {
        try {
            const { id } = req.params;
            const unidadeId = Number(id);
            const unidade = await models_1.default.unidade.findUnique({
                where: { id: unidadeId },
            });
            if (!unidade) {
                return res.status(404).json({ error: 'Unidade não encontrada' });
            }
            return res.json(unidade);
        }
        catch (error) {
            console.error('Erro ao obter unidade:', error);
            return res.status(500).json({ error: 'Erro ao obter unidade' });
        }
    },
    // Criar uma nova unidade
    async criar(req, res) {
        try {
            const { nome } = req.body;
            if (!nome) {
                return res.status(400).json({ error: 'Nome da unidade é obrigatório' });
            }
            const unidade = await models_1.default.unidade.create({
                data: { nome },
            });
            return res.status(201).json(unidade);
        }
        catch (error) {
            console.error('Erro ao criar unidade:', error);
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    return res.status(400).json({ error: 'Já existe uma unidade com este nome' });
                }
            }
            return res.status(500).json({ error: 'Erro ao criar unidade' });
        }
    },
    // Atualizar uma unidade existente
    async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { nome } = req.body;
            const unidadeId = Number(id);
            if (!nome) {
                return res.status(400).json({ error: 'Nome da unidade é obrigatório' });
            }
            const unidadeExistente = await models_1.default.unidade.findUnique({
                where: { id: unidadeId },
            });
            if (!unidadeExistente) {
                return res.status(404).json({ error: 'Unidade não encontrada' });
            }
            const unidade = await models_1.default.unidade.update({
                where: { id: unidadeId },
                data: { nome },
            });
            return res.json(unidade);
        }
        catch (error) {
            console.error('Erro ao atualizar unidade:', error);
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    return res.status(400).json({ error: 'Já existe uma unidade com este nome' });
                }
            }
            return res.status(500).json({ error: 'Erro ao atualizar unidade' });
        }
    },
    // Excluir uma unidade
    async excluir(req, res) {
        try {
            const { id } = req.params;
            const unidadeId = Number(id);
            const unidadeExistente = await models_1.default.unidade.findUnique({
                where: { id: unidadeId },
            });
            if (!unidadeExistente) {
                return res.status(404).json({ error: 'Unidade não encontrada' });
            }
            const tarefasAssociadas = await models_1.default.tarefa.findFirst({
                where: { unidadeId: unidadeId },
            });
            if (tarefasAssociadas) {
                return res.status(400).json({
                    error: 'Não é possível excluir esta unidade pois existem tarefas associadas a ela',
                });
            }
            await models_1.default.unidade.delete({
                where: { id: unidadeId },
            });
            return res.status(204).send();
        }
        catch (error) {
            console.error('Erro ao excluir unidade:', error);
            return res.status(500).json({ error: 'Erro ao excluir unidade' });
        }
    },
};
