/*
  Warnings:

  - You are about to drop the `CertificacoesOperador` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CertificacoesOperador" DROP CONSTRAINT "CertificacoesOperador_operadorId_fkey";

-- DropTable
DROP TABLE "CertificacoesOperador";

-- CreateTable
CREATE TABLE "certificacoes_operador" (
    "id" SERIAL NOT NULL,
    "numero_certificado" TEXT NOT NULL,
    "tipo_maquina" TEXT NOT NULL,
    "url_certificado" TEXT NOT NULL,
    "data_vencimento" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "operadorId" TEXT NOT NULL,

    CONSTRAINT "certificacoes_operador_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "certificacoes_operador" ADD CONSTRAINT "certificacoes_operador_operadorId_fkey" FOREIGN KEY ("operadorId") REFERENCES "operadores"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;
