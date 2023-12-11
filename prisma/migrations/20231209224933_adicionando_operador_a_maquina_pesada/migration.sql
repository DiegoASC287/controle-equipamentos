/*
  Warnings:

  - Added the required column `operadorCpf` to the `categoria_maquinas_pesadas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "categoria_maquinas_pesadas" ADD COLUMN     "operadorCpf" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "categoria_maquinas_pesadas" ADD CONSTRAINT "categoria_maquinas_pesadas_operadorCpf_fkey" FOREIGN KEY ("operadorCpf") REFERENCES "operadores"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;
