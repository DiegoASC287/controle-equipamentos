/*
  Warnings:

  - You are about to drop the `tipo_caminhao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tipo_retroescavadeira` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "tipo_caminhao" DROP CONSTRAINT "tipo_caminhao_maquinaId_fkey";

-- DropTable
DROP TABLE "tipo_caminhao";

-- DropTable
DROP TABLE "tipo_retroescavadeira";

-- CreateTable
CREATE TABLE "tipo_caminoes" (
    "id" SERIAL NOT NULL,
    "alimentacao" TEXT,
    "dimensao_trabalho" DOUBLE PRECISION,
    "identificador" TEXT,
    "foto_habilitacao" TEXT,
    "data_vencimento_habilitacao" TIMESTAMP(3),
    "foto_documento" TEXT,
    "data_vencimento_documento" TIMESTAMP(3),
    "maquinaId" INTEGER NOT NULL,

    CONSTRAINT "tipo_caminoes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tipo_caminoes_maquinaId_key" ON "tipo_caminoes"("maquinaId");

-- AddForeignKey
ALTER TABLE "tipo_caminoes" ADD CONSTRAINT "tipo_caminoes_maquinaId_fkey" FOREIGN KEY ("maquinaId") REFERENCES "maquinas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
