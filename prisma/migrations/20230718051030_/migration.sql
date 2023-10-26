/*
  Warnings:

  - A unique constraint covering the columns `[answer_id]` on the table `answer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `answer_answer_id_key` ON `answer`(`answer_id`);
