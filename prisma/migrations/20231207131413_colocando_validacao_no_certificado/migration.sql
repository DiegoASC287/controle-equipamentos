/*
  Warnings:

  - Added the required column `aprovado` to the `certificacoes_operador` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "certificacoes_operador" ADD COLUMN     "aprovado" BOOLEAN NOT NULL;
