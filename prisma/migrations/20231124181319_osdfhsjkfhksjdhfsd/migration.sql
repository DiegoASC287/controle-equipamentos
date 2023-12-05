/*
  Warnings:

  - You are about to drop the `Apontador` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Interferencia` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `apontadorId` to the `atividades` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Apontador" DROP CONSTRAINT "Apontador_atividadeId_fkey";

-- DropForeignKey
ALTER TABLE "Interferencia" DROP CONSTRAINT "Interferencia_atividadeId_fkey";

-- AlterTable
ALTER TABLE "atividades" ADD COLUMN     "apontadorId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Apontador";

-- DropTable
DROP TABLE "Interferencia";

-- CreateTable
CREATE TABLE "interferencias" (
    "id" SERIAL NOT NULL,
    "hora_inicial" TIMESTAMP(3),
    "hora_final" TIMESTAMP(3),
    "motivo" TEXT,
    "atividadeId" INTEGER NOT NULL,

    CONSTRAINT "interferencias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "apontadores" (
    "id" SERIAL NOT NULL,
    "nome" TEXT,
    "idade" INTEGER,

    CONSTRAINT "apontadores_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "atividades" ADD CONSTRAINT "atividades_apontadorId_fkey" FOREIGN KEY ("apontadorId") REFERENCES "apontadores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interferencias" ADD CONSTRAINT "interferencias_atividadeId_fkey" FOREIGN KEY ("atividadeId") REFERENCES "atividades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
