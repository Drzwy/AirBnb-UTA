/*
  Warnings:

  - You are about to drop the column `comuna` on the `Propiedad` table. All the data in the column will be lost.
  - You are about to drop the column `opciones_de_llegada` on the `Propiedad` table. All the data in the column will be lost.
  - You are about to drop the column `opciones_de_seguridad` on the `Propiedad` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `tipo_usuario` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Usuario` table. All the data in the column will be lost.
  - The primary key for the `ValoracionPropiedad` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ValoracionUsuario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[pais,ciudad,calle,nroCasa,nroDpto]` on the table `Propiedad` will be added. If there are existing duplicate values, this will fail.
  - Made the column `nroDpto` on table `Propiedad` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `fechaActualizacion` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `puntuacion` to the `ValoracionPropiedad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `puntuacion` to the `ValoracionUsuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Propiedad_pais_ciudad_comuna_calle_nroCasa_nroDpto_key";

-- AlterTable
ALTER TABLE "Propiedad" DROP COLUMN "comuna",
DROP COLUMN "opciones_de_llegada",
DROP COLUMN "opciones_de_seguridad",
ADD COLUMN     "opcionesDeLlegada" TEXT[],
ADD COLUMN     "opcionesDeSeguridad" TEXT[],
ALTER COLUMN "nroDpto" SET NOT NULL,
ALTER COLUMN "nroDpto" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "createdAt",
DROP COLUMN "tipo_usuario",
DROP COLUMN "updatedAt",
ADD COLUMN     "fechaActualizacion" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "tipoUsuario" "UserTypes" NOT NULL DEFAULT 'Cliente';

-- AlterTable
ALTER TABLE "ValoracionPropiedad" DROP CONSTRAINT "ValoracionPropiedad_pkey",
ADD COLUMN     "descripcion" TEXT,
ADD COLUMN     "puntuacion" INTEGER NOT NULL,
ADD CONSTRAINT "ValoracionPropiedad_pkey" PRIMARY KEY ("usuarioId", "propiedadCriticadaId");

-- AlterTable
ALTER TABLE "ValoracionUsuario" DROP CONSTRAINT "ValoracionUsuario_pkey",
ADD COLUMN     "descripcion" TEXT,
ADD COLUMN     "puntuacion" INTEGER NOT NULL,
ADD CONSTRAINT "ValoracionUsuario_pkey" PRIMARY KEY ("usuarioId", "usuarioCriticadoId");

-- CreateIndex
CREATE UNIQUE INDEX "Propiedad_pais_ciudad_calle_nroCasa_nroDpto_key" ON "Propiedad"("pais", "ciudad", "calle", "nroCasa", "nroDpto");
