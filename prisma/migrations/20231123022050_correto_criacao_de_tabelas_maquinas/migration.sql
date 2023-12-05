/*
  Warnings:

  - A unique constraint covering the columns `[maquinaId]` on the table `alugadas` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `maquinaId` to the `alugadas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "alugadas" ADD COLUMN     "maquinaId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "manutencoes" ADD COLUMN     "maquinaId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "alugadas_maquinaId_key" ON "alugadas"("maquinaId");

-- AddForeignKey
ALTER TABLE "manutencoes" ADD CONSTRAINT "manutencoes_maquinaId_fkey" FOREIGN KEY ("maquinaId") REFERENCES "maquinas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alugadas" ADD CONSTRAINT "alugadas_maquinaId_fkey" FOREIGN KEY ("maquinaId") REFERENCES "maquinas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
