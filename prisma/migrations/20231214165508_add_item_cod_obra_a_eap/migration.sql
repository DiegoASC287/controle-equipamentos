/*
  Warnings:

  - Added the required column `cod_obra` to the `eap` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "eap" ADD COLUMN     "cod_obra" TEXT NOT NULL;
