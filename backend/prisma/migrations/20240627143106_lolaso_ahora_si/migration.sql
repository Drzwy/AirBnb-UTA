/*
  Warnings:

  - You are about to drop the column `usuarioPagador` on the `Hospedaje` table. All the data in the column will be lost.
  - Added the required column `usuarioPagadorId` to the `Hospedaje` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Hospedaje" DROP CONSTRAINT "Hospedaje_metodoDePagoId_usuarioPagador_fkey";

-- AlterTable
ALTER TABLE "Hospedaje" DROP COLUMN "usuarioPagador",
ADD COLUMN     "usuarioPagadorId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Hospedaje" ADD CONSTRAINT "Hospedaje_metodoDePagoId_usuarioPagadorId_fkey" FOREIGN KEY ("metodoDePagoId", "usuarioPagadorId") REFERENCES "MetodoDePago"("id", "propietarioId") ON DELETE RESTRICT ON UPDATE CASCADE;
