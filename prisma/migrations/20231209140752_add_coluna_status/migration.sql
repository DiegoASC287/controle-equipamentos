/*
  Warnings:

  - You are about to drop the column `aprovado` on the `certificacoes_operador` table. All the data in the column will be lost.
  - Added the required column `status` to the `certificacoes_operador` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "certificacoes_operador" DROP COLUMN "aprovado",
ADD COLUMN     "status" TEXT NOT NULL;
