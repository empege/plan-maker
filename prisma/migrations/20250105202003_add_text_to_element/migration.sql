/*
  Warnings:

  - You are about to alter the column `element` on the `element` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `element` MODIFY `element` VARCHAR(191) NOT NULL;
