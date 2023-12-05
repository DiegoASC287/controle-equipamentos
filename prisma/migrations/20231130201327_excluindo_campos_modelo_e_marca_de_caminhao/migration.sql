/*
  Warnings:

  - You are about to drop the column `marca` on the `Caminhao` table. All the data in the column will be lost.
  - You are about to drop the column `modelo` on the `Caminhao` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Caminhao" DROP COLUMN "marca",
DROP COLUMN "modelo";
