/*
  Warnings:

  - The values [TSCC] on the enum `Aspirasi_organisasi` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Organisasi` MODIFY `organisasi` ENUM('OSIS', 'MPK', 'BDI', 'PALWAGA', 'PASKATEMA', 'TSBC', 'TSFC', 'TSVC', 'PMR', 'MEMO', 'MAC', 'METIC', 'COMET', 'PUSTEL', 'DA') NOT NULL;

-- CreateTable
CREATE TABLE `Event` (
    `id` VARCHAR(191) NOT NULL,
    `event_name` VARCHAR(191) NOT NULL,
    `user_id` CHAR(36) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `organisasiId` CHAR(36) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Aspirasi` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `event_id` CHAR(36) NULL,
    `judul_aspirasi` VARCHAR(191) NOT NULL,
    `pesan_aspirasi` LONGTEXT NOT NULL,
    `organisasi` ENUM('OSIS', 'MPK', 'BDI', 'PALWAGA', 'PASKATEMA', 'TSBC', 'TSFC', 'TSVC', 'PMR', 'MEMO', 'MAC', 'METIC', 'COMET', 'PUSTEL', 'DA') NOT NULL,
    `unit_sekolah` ENUM('HUBIN', 'KURIKULUM', 'KESISWAAN', 'SARPRA', 'ISO', 'TU', 'GURU', 'SATPAMCS') NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_organisasiId_fkey` FOREIGN KEY (`organisasiId`) REFERENCES `Organisasi`(`suborgan_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Aspirasi` ADD CONSTRAINT `Aspirasi_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Aspirasi` ADD CONSTRAINT `Aspirasi_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `Event`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
