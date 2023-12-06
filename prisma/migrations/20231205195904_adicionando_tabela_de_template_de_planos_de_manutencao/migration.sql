-- CreateTable
CREATE TABLE "TemplatePlanoManutencoes" (
    "tipo_veiculo" TEXT NOT NULL,
    "manutencao" TEXT NOT NULL,
    "intervalo" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "TemplatePlanoManutencoes_pkey" PRIMARY KEY ("tipo_veiculo")
);
