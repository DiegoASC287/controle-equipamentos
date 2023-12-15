/*
  Warnings:

  - You are about to drop the `TipoAtividade` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ItemAssociacaoEap" DROP CONSTRAINT "ItemAssociacaoEap_tipo_atividade_id_fkey";

-- DropTable
DROP TABLE "TipoAtividade";

-- CreateTable
CREATE TABLE "tipo_atividade" (
    "id" SERIAL NOT NULL,
    "nome" TEXT,
    "unidade" TEXT,

    CONSTRAINT "tipo_atividade_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ItemAssociacaoEap" ADD CONSTRAINT "ItemAssociacaoEap_tipo_atividade_id_fkey" FOREIGN KEY ("tipo_atividade_id") REFERENCES "tipo_atividade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
