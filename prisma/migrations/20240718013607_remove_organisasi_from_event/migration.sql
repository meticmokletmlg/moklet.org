/*
  Warnings:

  - You are about to drop the column `organisasiId` on the `event` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Event` DROP FOREIGN KEY `Event_organisasiId_fkey`;

-- AlterTable
ALTER TABLE `Event` DROP COLUMN `organisasiId`;
