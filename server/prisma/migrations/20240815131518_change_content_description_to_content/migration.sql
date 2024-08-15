/*
  Warnings:

  - You are about to drop the column `descritpion` on the `contents` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "contents" DROP COLUMN "descritpion",
ADD COLUMN     "content" TEXT;
