/*
  Warnings:

  - You are about to drop the column `body` on the `Blog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "body",
ADD COLUMN     "description" TEXT;
