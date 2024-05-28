/*
  Warnings:

  - Added the required column `maxPersonas` to the `Propiedad` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Propiedad" ADD COLUMN     "maxPersonas" INTEGER NOT NULL;
