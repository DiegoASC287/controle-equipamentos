/*
  Warnings:

  - You are about to drop the column `item_associacao_id` on the `TipoAtividade` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tipo_atividade_id]` on the table `ItemAssociacaoEap` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tipo_atividade_id` to the `ItemAssociacaoEap` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TipoAtividade" DROP CONSTRAINT "TipoAtividade_item_associacao_id_fkey";

-- DropIndex
DROP INDEX "TipoAtividade_item_associacao_id_key";

-- AlterTable
ALTER TABLE "ItemAssociacaoEap" ADD COLUMN     "tipo_atividade_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "TipoAtividade" DROP COLUMN "item_associacao_id";

-- CreateIndex
CREATE UNIQUE INDEX "ItemAssociacaoEap_tipo_atividade_id_key" ON "ItemAssociacaoEap"("tipo_atividade_id");

-- AddForeignKey
ALTER TABLE "ItemAssociacaoEap" ADD CONSTRAINT "ItemAssociacaoEap_tipo_atividade_id_fkey" FOREIGN KEY ("tipo_atividade_id") REFERENCES "TipoAtividade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
