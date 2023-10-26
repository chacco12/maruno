/*
  Warnings:

  - The primary key for the `answer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `answer_id` on the `answer` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `answer` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `answer` table. All the data in the column will be lost.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `deleteFlag` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - The required column `answer_id` was added to the `answer` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `user_id` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `user_user_id_key` ON `user`;

-- AlterTable
ALTER TABLE `answer` DROP PRIMARY KEY,
    DROP COLUMN `answer_id`,
    DROP COLUMN `createdAt`,
    DROP COLUMN `user_id`,
    ADD COLUMN `answer_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `user_id` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`answer_id`);

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    DROP COLUMN `createdAt`,
    DROP COLUMN `deleteFlag`,
    DROP COLUMN `updatedAt`,
    DROP COLUMN `user_id`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `delete_flag` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `user_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`user_id`);

-- CreateIndex
CREATE UNIQUE INDEX `user_user_id_key` ON `user`(`user_id`);
