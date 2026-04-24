/*
  Warnings:

  - You are about to drop the column `status` on the `category` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `category` DROP COLUMN `status`;

-- AlterTable
ALTER TABLE `product` ADD COLUMN `status` INTEGER NULL;
