/*
  Warnings:

  - Added the required column `maquinaId` to the `atividades` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "atividades" ADD COLUMN     "maquinaId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "atividades" ADD CONSTRAINT "atividades_maquinaId_fkey" FOREIGN KEY ("maquinaId") REFERENCES "maquinas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
