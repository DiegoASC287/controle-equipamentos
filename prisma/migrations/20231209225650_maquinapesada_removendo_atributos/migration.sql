/*
  Warnings:

  - You are about to drop the column `data_vencimento_habilitacao` on the `categoria_maquinas_pesadas` table. All the data in the column will be lost.
  - You are about to drop the column `foto_habilitacao` on the `categoria_maquinas_pesadas` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "categoria_maquinas_pesadas" DROP COLUMN "data_vencimento_habilitacao",
DROP COLUMN "foto_habilitacao";
