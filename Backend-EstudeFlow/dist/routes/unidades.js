"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const express_1 = __importDefault(require("express"));
const unidadesController_1 = require("../controllers/unidadesController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
router.use('/', authMiddleware_1.authMiddleware);
router.get('/', asyncHandler(unidadesController_1.unidadesController.listar));
router.get('/:id', asyncHandler(unidadesController_1.unidadesController.obter));
router.post('/', asyncHandler(unidadesController_1.unidadesController.criar));
router.put('/:id', asyncHandler(unidadesController_1.unidadesController.atualizar));
router.delete('/:id', asyncHandler(unidadesController_1.unidadesController.excluir));
exports.default = router;
