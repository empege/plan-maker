/*
  Warnings:

  - You are about to drop the column `type` on the `element` table. All the data in the column will be lost.
  - Added the required column `element` to the `Element` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `element` DROP COLUMN `type`,
    ADD COLUMN `element` VARCHAR(191) NOT NULL;
