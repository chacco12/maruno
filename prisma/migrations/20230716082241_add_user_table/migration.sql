/*
  Warnings:

  - The primary key for the `answer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `answer` table. All the data in the column will be lost.
  - The `result` column on the `answer` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The required column `answer_id` was added to the `answer` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `input` to the `answer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `answer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `answer` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `answer_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `input` JSON NOT NULL,
    ADD COLUMN `user_id` VARCHAR(191) NOT NULL,
    DROP COLUMN `result`,
    ADD COLUMN `result` JSON NULL,
    ADD PRIMARY KEY (`answer_id`);

-- CreateTable
CREATE TABLE `user` (
    `user_id` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deleteFlag` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `user_user_id_key`(`user_id`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
