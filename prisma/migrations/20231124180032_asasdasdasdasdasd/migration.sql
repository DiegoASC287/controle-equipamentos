-- CreateTable
CREATE TABLE "Apontador" (
    "nome" TEXT,
    "idade" INTEGER,
    "atividadeId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Apontador_atividadeId_key" ON "Apontador"("atividadeId");

-- AddForeignKey
ALTER TABLE "Apontador" ADD CONSTRAINT "Apontador_atividadeId_fkey" FOREIGN KEY ("atividadeId") REFERENCES "atividades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
