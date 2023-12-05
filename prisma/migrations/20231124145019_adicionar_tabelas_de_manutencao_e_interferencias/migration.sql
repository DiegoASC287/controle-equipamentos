-- CreateTable
CREATE TABLE "atividades" (
    "id" SERIAL NOT NULL,
    "descricao_serv" TEXT,
    "data_inicial_trabalho" TIMESTAMP(3),
    "data_final_trabalho" TIMESTAMP(3),
    "operador" TEXT,
    "horimetro_inicial" DOUBLE PRECISION,
    "horimetro_final" DOUBLE PRECISION,

    CONSTRAINT "atividades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Interferencia" (
    "id" SERIAL NOT NULL,
    "hora_inicial" TIMESTAMP(3),
    "hora_final" TIMESTAMP(3),
    "motivo" TEXT,
    "atividadeId" INTEGER NOT NULL,

    CONSTRAINT "Interferencia_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Interferencia" ADD CONSTRAINT "Interferencia_atividadeId_fkey" FOREIGN KEY ("atividadeId") REFERENCES "atividades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
