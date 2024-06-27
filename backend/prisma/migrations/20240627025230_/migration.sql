/*
  Warnings:

  - Added the required column `costoHospedaje` to the `Hospedaje` table without a default value. This is not possible if the table is not empty.
  - Added the required column `costoNoche` to the `Hospedaje` table without a default value. This is not possible if the table is not empty.
  - Added the required column `metodoDePagoId` to the `Hospedaje` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nochesDeEstadia` to the `Hospedaje` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuarioPagadorId` to the `Hospedaje` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Hospedaje" ADD COLUMN     "costoHospedaje" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "costoNoche" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "metodoDePagoId" INTEGER NOT NULL,
ADD COLUMN     "nochesDeEstadia" INTEGER NOT NULL,
ADD COLUMN     "nroAdultos" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "nroBebes" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "nroMascotas" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "nroNinos" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "tarifaLimpieza" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "tarifaServicio" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "usuarioPagadorId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ValoracionPropiedad" ALTER COLUMN "estaActivo" SET DEFAULT true;

-- AlterTable
ALTER TABLE "ValoracionUsuario" ALTER COLUMN "estaActivo" SET DEFAULT true;

-- CreateTable
CREATE TABLE "MetodoDePago" (
    "id" SERIAL NOT NULL,
    "infoTarjeta" TEXT NOT NULL,
    "propietarioId" INTEGER NOT NULL,

    CONSTRAINT "MetodoDePago_pkey" PRIMARY KEY ("id","propietarioId")
);

-- AddForeignKey
ALTER TABLE "Hospedaje" ADD CONSTRAINT "Hospedaje_metodoDePagoId_usuarioPagadorId_fkey" FOREIGN KEY ("metodoDePagoId", "usuarioPagadorId") REFERENCES "MetodoDePago"("id", "propietarioId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MetodoDePago" ADD CONSTRAINT "MetodoDePago_propietarioId_fkey" FOREIGN KEY ("propietarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
