import { z } from 'zod';

export const idObject = z.object({
    id: z.string().cuid(),
});

export const deleteObject = z.object({
    message: z.string(),
});

export const idType = z.string().cuid();

export const PrismaObject = z.object({
    id: z.string().cuid(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export type IdObject = z.infer<typeof idObject>;
export type DeleteObject = z.infer<typeof deleteObject>;
export type IdType = z.infer<typeof idType>;
export type PrismaType = z.infer<typeof PrismaObject>;