/*
  Warnings:

  - You are about to drop the `Obra` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Obra";

-- CreateTable
CREATE TABLE "obras" (
    "codigo" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "imagem_url" TEXT NOT NULL,

    CONSTRAINT "obras_pkey" PRIMARY KEY ("codigo")
);
