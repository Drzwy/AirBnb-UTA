/*
  Warnings:

  - The `tipo_usuario` column on the `Usuario` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `descripcion` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `run` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Made the column `nombre` on table `Usuario` required. This step will fail if there are existing NULL values in that column.
  - Made the column `apellidoPat` on table `Usuario` required. This step will fail if there are existing NULL values in that column.
  - Made the column `apellidoMat` on table `Usuario` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "UserTypes" AS ENUM ('Cliente', 'Administrador');

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "descripcion" TEXT NOT NULL,
ADD COLUMN     "detalles" TEXT[],
ADD COLUMN     "idiomas" TEXT[],
ADD COLUMN     "run" TEXT NOT NULL,
ALTER COLUMN "nombre" SET NOT NULL,
ALTER COLUMN "apellidoPat" SET NOT NULL,
ALTER COLUMN "apellidoMat" SET NOT NULL,
DROP COLUMN "tipo_usuario",
ADD COLUMN     "tipo_usuario" "UserTypes" NOT NULL DEFAULT 'Cliente';
