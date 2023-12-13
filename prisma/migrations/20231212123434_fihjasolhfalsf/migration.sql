/*
  Warnings:

  - You are about to drop the column `artUrl` on the `maquinas` table. All the data in the column will be lost.
  - You are about to drop the column `planoManUrl` on the `maquinas` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "categoria_maquinas_pesadas" ADD COLUMN     "artUrl" TEXT,
ADD COLUMN     "planoManUrl" TEXT;

-- AlterTable
ALTER TABLE "maquinas" DROP COLUMN "artUrl",
DROP COLUMN "planoManUrl";
