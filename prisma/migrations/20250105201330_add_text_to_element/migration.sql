/*
  Warnings:

  - You are about to alter the column `element` on the `element` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `element` MODIFY `element` ENUM('title', 'subtitle', 'checkbox', 'spacer', 'text') NOT NULL;
