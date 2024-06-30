/*
  Warnings:

  - You are about to drop the column `fechasDisponibles` on the `Propiedad` table. All the data in the column will be lost.
  - You are about to drop the column `maxPersonas` on the `Propiedad` table. All the data in the column will be lost.
  - Added the required column `maxAdultos` to the `Propiedad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxBebes` to the `Propiedad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxMascotas` to the `Propiedad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxNinos` to the `Propiedad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titulo` to the `Propiedad` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Propiedad" DROP COLUMN "fechasDisponibles",
DROP COLUMN "maxPersonas",
ADD COLUMN     "fechasOcupadas" DATE[],
ADD COLUMN     "maxAdultos" INTEGER NOT NULL,
ADD COLUMN     "maxBebes" INTEGER NOT NULL,
ADD COLUMN     "maxMascotas" INTEGER NOT NULL,
ADD COLUMN     "maxNinos" INTEGER NOT NULL,
ADD COLUMN     "titulo" TEXT NOT NULL;
