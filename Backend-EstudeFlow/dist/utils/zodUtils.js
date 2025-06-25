"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaObject = exports.idType = exports.deleteObject = exports.idObject = void 0;
const zod_1 = require("zod");
exports.idObject = zod_1.z.object({
    id: zod_1.z.string().cuid(),
});
exports.deleteObject = zod_1.z.object({
    message: zod_1.z.string(),
});
exports.idType = zod_1.z.string().cuid();
exports.PrismaObject = zod_1.z.object({
    id: zod_1.z.string().cuid(),
    createdAt: zod_1.z.string(),
    updatedAt: zod_1.z.string(),
});
