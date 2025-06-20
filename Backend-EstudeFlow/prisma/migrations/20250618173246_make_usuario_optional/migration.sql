-- DropForeignKey
ALTER TABLE `tarefa` DROP FOREIGN KEY `Tarefa_usuarioId_fkey`;

-- DropIndex
DROP INDEX `Tarefa_usuarioId_fkey` ON `tarefa`;

-- AlterTable
ALTER TABLE `tarefa` MODIFY `usuarioId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Tarefa` ADD CONSTRAINT `Tarefa_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
