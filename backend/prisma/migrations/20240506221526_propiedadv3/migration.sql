/*
  Warnings:

  - You are about to drop the column `fechas_disponibles` on the `Propiedad` table. All the data in the column will be lost.
  - You are about to drop the column `numero_casa` on the `Propiedad` table. All the data in the column will be lost.
  - You are about to drop the column `numero_dpto` on the `Propiedad` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `Propiedad` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[calle,nroCasa,nroDpto]` on the table `Propiedad` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `anfitrionId` to the `Propiedad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nroCasa` to the `Propiedad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `precioNoche` to the `Propiedad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zonaId` to the `Propiedad` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Propiedad" DROP CONSTRAINT "Propiedad_ownerId_fkey";

-- AlterTable
ALTER TABLE "Propiedad" DROP COLUMN "fechas_disponibles",
DROP COLUMN "numero_casa",
DROP COLUMN "numero_dpto",
DROP COLUMN "ownerId",
ADD COLUMN     "anfitrionId" INTEGER NOT NULL,
ADD COLUMN     "fechasDisponibles" DATE[],
ADD COLUMN     "nroCasa" INTEGER NOT NULL,
ADD COLUMN     "nroDpto" INTEGER,
ADD COLUMN     "precioNoche" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "zonaId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Hospedaje" (
    "huespedId" INTEGER NOT NULL,
    "propiedadId" INTEGER NOT NULL,
    "fechaIni" DATE NOT NULL,
    "fechaFin" DATE NOT NULL,

    CONSTRAINT "Hospedaje_pkey" PRIMARY KEY ("huespedId","propiedadId")
);

-- CreateTable
CREATE TABLE "Zona" (
    "id" SERIAL NOT NULL,
    "pais" TEXT NOT NULL,
    "ciudad" TEXT NOT NULL,
    "comuna" TEXT NOT NULL,

    CONSTRAINT "Zona_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ValoracionUsuario" (
    "usuarioId" INTEGER NOT NULL,
    "usuarioCriticadoId" INTEGER NOT NULL,

    CONSTRAINT "ValoracionUsuario_pkey" PRIMARY KEY ("usuarioId")
);

-- CreateTable
CREATE TABLE "ValoracionPropiedad" (
    "usuarioId" INTEGER NOT NULL,
    "propiedadCriticadaId" INTEGER NOT NULL,

    CONSTRAINT "ValoracionPropiedad_pkey" PRIMARY KEY ("usuarioId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Zona_pais_ciudad_comuna_key" ON "Zona"("pais", "ciudad", "comuna");

-- CreateIndex
CREATE UNIQUE INDEX "Propiedad_calle_nroCasa_nroDpto_key" ON "Propiedad"("calle", "nroCasa", "nroDpto");

-- AddForeignKey
ALTER TABLE "Propiedad" ADD CONSTRAINT "Propiedad_anfitrionId_fkey" FOREIGN KEY ("anfitrionId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Propiedad" ADD CONSTRAINT "Propiedad_zonaId_fkey" FOREIGN KEY ("zonaId") REFERENCES "Zona"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hospedaje" ADD CONSTRAINT "Hospedaje_huespedId_fkey" FOREIGN KEY ("huespedId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hospedaje" ADD CONSTRAINT "Hospedaje_propiedadId_fkey" FOREIGN KEY ("propiedadId") REFERENCES "Propiedad"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ValoracionUsuario" ADD CONSTRAINT "ValoracionUsuario_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ValoracionUsuario" ADD CONSTRAINT "ValoracionUsuario_usuarioCriticadoId_fkey" FOREIGN KEY ("usuarioCriticadoId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ValoracionPropiedad" ADD CONSTRAINT "ValoracionPropiedad_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ValoracionPropiedad" ADD CONSTRAINT "ValoracionPropiedad_propiedadCriticadaId_fkey" FOREIGN KEY ("propiedadCriticadaId") REFERENCES "Propiedad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
