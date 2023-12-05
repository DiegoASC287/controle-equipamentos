/*
  Warnings:

  - Added the required column `fornecedor` to the `alugadas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "alugadas" ADD COLUMN     "fornecedor" TEXT NOT NULL;
