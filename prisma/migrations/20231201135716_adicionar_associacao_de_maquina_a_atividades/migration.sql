/*
  Warnings:

  - You are about to drop the `Caminhao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Retroescavadeira` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Caminhao" DROP CONSTRAINT "Caminhao_maquinaId_fkey";

-- DropTable
DROP TABLE "Caminhao";

-- DropTable
DROP TABLE "Retroescavadeira";

-- CreateTable
CREATE TABLE "ItemAssociacaoEap" (
    "id" SERIAL NOT NULL,
    "itemEap" TEXT,
    "apelido" TEXT,
    "maquinaId" INTEGER NOT NULL,

    CONSTRAINT "ItemAssociacaoEap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TipoAtividade" (
    "id" SERIAL NOT NULL,
    "nome" TEXT,
    "unidade" TEXT,
    "item_associacao_id" INTEGER NOT NULL,

    CONSTRAINT "TipoAtividade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tipo_caminhao" (
    "id" SERIAL NOT NULL,
    "alimentacao" TEXT,
    "tara" DOUBLE PRECISION,
    "volume_cacamba" DOUBLE PRECISION,
    "placa" TEXT,
    "habilitacao_motorista" TEXT,
    "foto_habilitacao" TEXT,
    "foto_documento" TEXT,
    "maquinaId" INTEGER NOT NULL,

    CONSTRAINT "tipo_caminhao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tipo_retroescavadeira" (
    "id" SERIAL NOT NULL,
    "vol_concha" DOUBLE PRECISION NOT NULL,
    "certificado_operador" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "marca" TEXT NOT NULL,

    CONSTRAINT "tipo_retroescavadeira_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ItemAssociacaoEap_maquinaId_key" ON "ItemAssociacaoEap"("maquinaId");

-- CreateIndex
CREATE UNIQUE INDEX "TipoAtividade_item_associacao_id_key" ON "TipoAtividade"("item_associacao_id");

-- CreateIndex
CREATE UNIQUE INDEX "tipo_caminhao_maquinaId_key" ON "tipo_caminhao"("maquinaId");

-- AddForeignKey
ALTER TABLE "ItemAssociacaoEap" ADD CONSTRAINT "ItemAssociacaoEap_maquinaId_fkey" FOREIGN KEY ("maquinaId") REFERENCES "maquinas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TipoAtividade" ADD CONSTRAINT "TipoAtividade_item_associacao_id_fkey" FOREIGN KEY ("item_associacao_id") REFERENCES "ItemAssociacaoEap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tipo_caminhao" ADD CONSTRAINT "tipo_caminhao_maquinaId_fkey" FOREIGN KEY ("maquinaId") REFERENCES "maquinas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
