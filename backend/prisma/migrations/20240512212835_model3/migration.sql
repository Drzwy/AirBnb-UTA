/*
  Warnings:

  - The primary key for the `Hospedaje` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ValoracionPropiedad` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `usuarioId` on the `ValoracionPropiedad` table. All the data in the column will be lost.
  - The primary key for the `ValoracionUsuario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `usuarioId` on the `ValoracionUsuario` table. All the data in the column will be lost.
  - Added the required column `estaActivo` to the `Hospedaje` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estaActivo` to the `Propiedad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fechaActualizacion` to the `Propiedad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estaActivo` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estaActivo` to the `ValoracionPropiedad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuarioCreadorId` to the `ValoracionPropiedad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estaActivo` to the `ValoracionUsuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuarioCreadorId` to the `ValoracionUsuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ValoracionPropiedad" DROP CONSTRAINT "ValoracionPropiedad_propiedadCriticadaId_fkey";

-- DropForeignKey
ALTER TABLE "ValoracionPropiedad" DROP CONSTRAINT "ValoracionPropiedad_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "ValoracionUsuario" DROP CONSTRAINT "ValoracionUsuario_usuarioId_fkey";

-- AlterTable
ALTER TABLE "Hospedaje" DROP CONSTRAINT "Hospedaje_pkey",
ADD COLUMN     "estaActivo" BOOLEAN NOT NULL,
ADD COLUMN     "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Hospedaje_pkey" PRIMARY KEY ("id", "huespedId", "propiedadId");

-- AlterTable
ALTER TABLE "Propiedad" ADD COLUMN     "estaActivo" BOOLEAN NOT NULL,
ADD COLUMN     "fechaActualizacion" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "estaActivo" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "ValoracionPropiedad" DROP CONSTRAINT "ValoracionPropiedad_pkey",
DROP COLUMN "usuarioId",
ADD COLUMN     "estaActivo" BOOLEAN NOT NULL,
ADD COLUMN     "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "usuarioCreadorId" INTEGER NOT NULL,
ADD CONSTRAINT "ValoracionPropiedad_pkey" PRIMARY KEY ("usuarioCreadorId", "propiedadCriticadaId");

-- AlterTable
ALTER TABLE "ValoracionUsuario" DROP CONSTRAINT "ValoracionUsuario_pkey",
DROP COLUMN "usuarioId",
ADD COLUMN     "estaActivo" BOOLEAN NOT NULL,
ADD COLUMN     "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "usuarioCreadorId" INTEGER NOT NULL,
ADD CONSTRAINT "ValoracionUsuario_pkey" PRIMARY KEY ("usuarioCreadorId", "usuarioCriticadoId");

-- AddForeignKey
ALTER TABLE "ValoracionUsuario" ADD CONSTRAINT "ValoracionUsuario_usuarioCreadorId_fkey" FOREIGN KEY ("usuarioCreadorId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ValoracionPropiedad" ADD CONSTRAINT "ValoracionPropiedad_usuarioCreadorId_fkey" FOREIGN KEY ("usuarioCreadorId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ValoracionPropiedad" ADD CONSTRAINT "ValoracionPropiedad_propiedadCriticadaId_fkey" FOREIGN KEY ("propiedadCriticadaId") REFERENCES "Propiedad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
