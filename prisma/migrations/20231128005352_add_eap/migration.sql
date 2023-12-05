/*
  Warnings:

  - Added the required column `eapId` to the `atividades` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "atividades" ADD COLUMN     "eapId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "eap" (
    "id" SERIAL NOT NULL,
    "item" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "unidade" TEXT NOT NULL,
    "indice" DOUBLE PRECISION NOT NULL,
    "preco_unitario" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "eap_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "eap_item_key" ON "eap"("item");

-- AddForeignKey
ALTER TABLE "atividades" ADD CONSTRAINT "atividades_eapId_fkey" FOREIGN KEY ("eapId") REFERENCES "eap"("item") ON DELETE RESTRICT ON UPDATE CASCADE;
