/*
  Warnings:

  - You are about to drop the column `contador` on the `manutencoes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "manutencoes" DROP COLUMN "contador",
ADD COLUMN     "momento" DOUBLE PRECISION;
