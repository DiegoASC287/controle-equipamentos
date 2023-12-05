-- CreateTable
CREATE TABLE "Caminhao" (
    "id" SERIAL NOT NULL,
    "alimentacao" TEXT NOT NULL,
    "tara" DOUBLE PRECISION NOT NULL,
    "volume_cacamba" DOUBLE PRECISION NOT NULL,
    "placa" TEXT NOT NULL,
    "habilitacao_motorista" TEXT NOT NULL,
    "foto_habilitacao" TEXT NOT NULL,
    "foto_documento" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "maquinaId" INTEGER NOT NULL,

    CONSTRAINT "Caminhao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Retroescavadeira" (
    "id" SERIAL NOT NULL,
    "vol_concha" DOUBLE PRECISION NOT NULL,
    "certificado_operador" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "marca" TEXT NOT NULL,

    CONSTRAINT "Retroescavadeira_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Caminhao_maquinaId_key" ON "Caminhao"("maquinaId");

-- AddForeignKey
ALTER TABLE "Caminhao" ADD CONSTRAINT "Caminhao_maquinaId_fkey" FOREIGN KEY ("maquinaId") REFERENCES "maquinas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
