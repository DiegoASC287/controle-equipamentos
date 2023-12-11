-- CreateTable
CREATE TABLE "operadores" (
    "cpf" TEXT NOT NULL,
    "imagem_url" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "sobrenome" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,

    CONSTRAINT "operadores_pkey" PRIMARY KEY ("cpf")
);

-- CreateTable
CREATE TABLE "CertificacoesOperador" (
    "id" SERIAL NOT NULL,
    "tipo_maquina" TEXT NOT NULL,
    "url_certificado" TEXT NOT NULL,
    "data_vencimento" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "operadorId" TEXT NOT NULL,

    CONSTRAINT "CertificacoesOperador_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "operadores_cpf_key" ON "operadores"("cpf");

-- AddForeignKey
ALTER TABLE "CertificacoesOperador" ADD CONSTRAINT "CertificacoesOperador_operadorId_fkey" FOREIGN KEY ("operadorId") REFERENCES "operadores"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;
