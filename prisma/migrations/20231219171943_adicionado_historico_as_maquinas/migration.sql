-- CreateTable
CREATE TABLE "HistoricoMaquina" (
    "id" SERIAL NOT NULL,
    "cod_obra" TEXT,
    "maquinaId" INTEGER NOT NULL,
    "data_inicial" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_final" TIMESTAMP(3),

    CONSTRAINT "HistoricoMaquina_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "HistoricoMaquina" ADD CONSTRAINT "HistoricoMaquina_maquinaId_fkey" FOREIGN KEY ("maquinaId") REFERENCES "maquinas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
