-- AlterTable
ALTER TABLE `user` ADD COLUMN `token` VARCHAR(191) NULL,
    ADD COLUMN `tokenExpires` DATETIME(3) NULL,
    ADD COLUMN `verified` BOOLEAN NOT NULL DEFAULT false;
