/*
  Warnings:

  - You are about to drop the column `step` on the `answer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `answer` DROP COLUMN `step`,
    ADD COLUMN `status` INTEGER NOT NULL DEFAULT 0;
