/*
  Warnings:

  - You are about to drop the column `data` on the `element` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `element` DROP COLUMN `data`,
    ADD COLUMN `checked` BOOLEAN NULL DEFAULT false,
    ADD COLUMN `size` INTEGER NULL,
    ADD COLUMN `text` VARCHAR(191) NULL;
