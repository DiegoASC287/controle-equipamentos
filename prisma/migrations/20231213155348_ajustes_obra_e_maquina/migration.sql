/*
  Warnings:

  - The primary key for the `Obra` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Obra" DROP CONSTRAINT "Obra_pkey",
ALTER COLUMN "codigo" SET DATA TYPE TEXT,
ADD CONSTRAINT "Obra_pkey" PRIMARY KEY ("codigo");

-- AlterTable
ALTER TABLE "maquinas" ADD COLUMN     "cod_obra" TEXT;
