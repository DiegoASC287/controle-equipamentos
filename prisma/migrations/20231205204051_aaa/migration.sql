/*
  Warnings:

  - The primary key for the `TemplatePlanoManutencoes` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "TemplatePlanoManutencoes" DROP CONSTRAINT "TemplatePlanoManutencoes_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "TemplatePlanoManutencoes_pkey" PRIMARY KEY ("id");
