-- AlterTable
ALTER TABLE "maquinas" ADD COLUMN     "categoria" TEXT;

-- CreateTable
CREATE TABLE "planos_manutencao" (
    "id" SERIAL NOT NULL,
    "maquinaId" INTEGER NOT NULL,
    "intervalo" DOUBLE PRECISION,
    "descricao" TEXT,

    CONSTRAINT "planos_manutencao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "planos_manutencao_maquinaId_key" ON "planos_manutencao"("maquinaId");

-- AddForeignKey
ALTER TABLE "planos_manutencao" ADD CONSTRAINT "planos_manutencao_maquinaId_fkey" FOREIGN KEY ("maquinaId") REFERENCES "maquinas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
