/*
  Warnings:

  - You are about to drop the column `status` on the `operadores` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "certificacoes_operador" ALTER COLUMN "status" SET DEFAULT 'Pendente';

-- AlterTable
ALTER TABLE "operadores" DROP COLUMN "status";
