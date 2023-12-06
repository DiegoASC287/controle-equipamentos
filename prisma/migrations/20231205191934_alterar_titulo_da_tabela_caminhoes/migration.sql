/*
  Warnings:

  - You are about to drop the `tipo_caminoes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "tipo_caminoes" DROP CONSTRAINT "tipo_caminoes_maquinaId_fkey";

-- DropTable
DROP TABLE "tipo_caminoes";

-- CreateTable
CREATE TABLE "categoria_maquinas_pesadas" (
    "id" SERIAL NOT NULL,
    "alimentacao" TEXT,
    "dimensao_trabalho" DOUBLE PRECISION,
    "identificador" TEXT,
    "foto_habilitacao" TEXT,
    "data_vencimento_habilitacao" TIMESTAMP(3),
    "foto_documento" TEXT,
    "data_vencimento_documento" TIMESTAMP(3),
    "maquinaId" INTEGER NOT NULL,

    CONSTRAINT "categoria_maquinas_pesadas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categoria_maquinas_pesadas_maquinaId_key" ON "categoria_maquinas_pesadas"("maquinaId");

-- AddForeignKey
ALTER TABLE "categoria_maquinas_pesadas" ADD CONSTRAINT "categoria_maquinas_pesadas_maquinaId_fkey" FOREIGN KEY ("maquinaId") REFERENCES "maquinas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
