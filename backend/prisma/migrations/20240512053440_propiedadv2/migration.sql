/*
  Warnings:

  - You are about to drop the column `zonaId` on the `Propiedad` table. All the data in the column will be lost.
  - You are about to drop the `Zona` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[pais,ciudad,comuna,calle,nroCasa,nroDpto]` on the table `Propiedad` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ciudad` to the `Propiedad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `comuna` to the `Propiedad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pais` to the `Propiedad` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Propiedad" DROP CONSTRAINT "Propiedad_zonaId_fkey";

-- DropIndex
DROP INDEX "Propiedad_calle_nroCasa_nroDpto_key";

-- AlterTable
ALTER TABLE "Propiedad" DROP COLUMN "zonaId",
ADD COLUMN     "ciudad" TEXT NOT NULL,
ADD COLUMN     "comuna" TEXT NOT NULL,
ADD COLUMN     "pais" TEXT NOT NULL;

-- DropTable
DROP TABLE "Zona";

-- CreateIndex
CREATE UNIQUE INDEX "Propiedad_pais_ciudad_comuna_calle_nroCasa_nroDpto_key" ON "Propiedad"("pais", "ciudad", "comuna", "calle", "nroCasa", "nroDpto");
