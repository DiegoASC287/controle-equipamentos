-- CreateTable
CREATE TABLE "maquinas" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "imagem" TEXT NOT NULL,
    "acaoNecessaria" BOOLEAN NOT NULL DEFAULT false,
    "quebrada" BOOLEAN NOT NULL DEFAULT false,
    "motivo_quebrada" TEXT,
    "origem" TEXT NOT NULL,
    "contador" DOUBLE PRECISION NOT NULL,
    "unidade" TEXT NOT NULL,
    "alimentacao" TEXT NOT NULL,

    CONSTRAINT "maquinas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "manutencoes" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "dataRealizacao" TIMESTAMP(3) NOT NULL,
    "contador" DOUBLE PRECISION NOT NULL,
    "custo" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "manutencoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alugadas" (
    "id" SERIAL NOT NULL,
    "data_locacao" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "previsao_entrega" TIMESTAMP(3),

    CONSTRAINT "alugadas_pkey" PRIMARY KEY ("id")
);
