"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tarefasController_1 = require("../controllers/tarefasController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
router.use(authMiddleware_1.authMiddleware);
router.get('/', asyncHandler(tarefasController_1.tarefasController.listar));
router.get('/:id', asyncHandler(tarefasController_1.tarefasController.obter));
router.post('/', asyncHandler(tarefasController_1.tarefasController.criar));
router.put('/:id', asyncHandler(tarefasController_1.tarefasController.atualizar));
router.delete('/:id', asyncHandler(tarefasController_1.tarefasController.excluir));
exports.default = router;
