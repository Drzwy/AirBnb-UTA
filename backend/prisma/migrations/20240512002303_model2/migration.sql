/*
  Warnings:

  - You are about to drop the column `fechas_disponibles` on the `Propiedad` table. All the data in the column will be lost.
  - You are about to drop the column `numero_casa` on the `Propiedad` table. All the data in the column will be lost.
  - You are about to drop the column `numero_dpto` on the `Propiedad` table. All the data in the column will be lost.
  - You are about to drop the column `opciones_de_llegada` on the `Propiedad` table. All the data in the column will be lost.
  - You are about to drop the column `opciones_de_seguridad` on the `Propiedad` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `Propiedad` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `tipo_usuario` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Usuario` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[pais,ciudad,calle,nroCasa,nroDpto]` on the table `Propiedad` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `anfitrionId` to the `Propiedad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ciudad` to the `Propiedad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nroCasa` to the `Propiedad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pais` to the `Propiedad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `precioNoche` to the `Propiedad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fechaActualizacion` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Propiedad" DROP CONSTRAINT "Propiedad_ownerId_fkey";

-- AlterTable
ALTER TABLE "Propiedad" DROP COLUMN "fechas_disponibles",
DROP COLUMN "numero_casa",
DROP COLUMN "numero_dpto",
DROP COLUMN "opciones_de_llegada",
DROP COLUMN "opciones_de_seguridad",
DROP COLUMN "ownerId",
ADD COLUMN     "anfitrionId" INTEGER NOT NULL,
ADD COLUMN     "ciudad" TEXT NOT NULL,
ADD COLUMN     "fechasDisponibles" DATE[],
ADD COLUMN     "nroCasa" INTEGER NOT NULL,
ADD COLUMN     "nroDpto" INTEGER,
ADD COLUMN     "opcionesDeLlegada" TEXT[],
ADD COLUMN     "opcionesDeSeguridad" TEXT[],
ADD COLUMN     "pais" TEXT NOT NULL,
ADD COLUMN     "precioNoche" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "createdAt",
DROP COLUMN "tipo_usuario",
DROP COLUMN "updatedAt",
ADD COLUMN     "fechaActualizacion" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "tipoUsuario" "UserTypes" NOT NULL DEFAULT 'Cliente';

-- CreateTable
CREATE TABLE "Hospedaje" (
    "huespedId" INTEGER NOT NULL,
    "propiedadId" INTEGER NOT NULL,
    "fechaIni" DATE NOT NULL,
    "fechaFin" DATE NOT NULL,

    CONSTRAINT "Hospedaje_pkey" PRIMARY KEY ("huespedId","propiedadId")
);

-- CreateTable
CREATE TABLE "ValoracionUsuario" (
    "usuarioId" INTEGER NOT NULL,
    "usuarioCriticadoId" INTEGER NOT NULL,
    "descripcion" TEXT,
    "puntuacion" INTEGER NOT NULL,

    CONSTRAINT "ValoracionUsuario_pkey" PRIMARY KEY ("usuarioId","usuarioCriticadoId")
);

-- CreateTable
CREATE TABLE "ValoracionPropiedad" (
    "usuarioId" INTEGER NOT NULL,
    "propiedadCriticadaId" INTEGER NOT NULL,
    "descripcion" TEXT,
    "puntuacion" INTEGER NOT NULL,

    CONSTRAINT "ValoracionPropiedad_pkey" PRIMARY KEY ("usuarioId","propiedadCriticadaId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Propiedad_pais_ciudad_calle_nroCasa_nroDpto_key" ON "Propiedad"("pais", "ciudad", "calle", "nroCasa", "nroDpto");

-- AddForeignKey
ALTER TABLE "Propiedad" ADD CONSTRAINT "Propiedad_anfitrionId_fkey" FOREIGN KEY ("anfitrionId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

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
ALTER TABLE "ValoracionPropiedad" ADD CONSTRAINT "ValoracionPropiedad_propiedadCriticadaId_fkey" FOREIGN KEY ("propiedadCriticadaId") REFERENCES "Propiedad"("id") ON DELETE CASCADE ON UPDATE CASCADE;
