/*
  Warnings:

  - Added the required column `unidade` to the `TemplatePlanoManutencoes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TemplatePlanoManutencoes" ADD COLUMN     "unidade" TEXT NOT NULL;
