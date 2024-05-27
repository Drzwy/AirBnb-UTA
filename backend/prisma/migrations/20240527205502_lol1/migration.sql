-- CreateEnum
CREATE TYPE "UserTypes" AS ENUM ('Cliente', 'Administrador');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tipo_usuario" "UserTypes" NOT NULL DEFAULT 'Cliente',
    "email" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "run" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellidoPat" TEXT NOT NULL,
    "apellidoMat" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "idiomas" TEXT[],
    "detalles" TEXT[],

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Propiedad" (
    "id" SERIAL NOT NULL,
    "dormitorios" INTEGER NOT NULL,
    "camas" INTEGER NOT NULL,
    "banos" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "fechas_disponibles" TIMESTAMP(3)[],
    "reglas" TEXT[],
    "calle" TEXT NOT NULL,
    "numero_casa" INTEGER NOT NULL,
    "numero_dpto" INTEGER,
    "comodidades" TEXT[],
    "opciones_de_seguridad" TEXT[],
    "opciones_de_llegada" TEXT[],
    "huespedId" INTEGER,
    "anfitrionId" INTEGER NOT NULL,

    CONSTRAINT "Propiedad_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_run_key" ON "Usuario"("run");

-- AddForeignKey
ALTER TABLE "Propiedad" ADD CONSTRAINT "Propiedad_huespedId_fkey" FOREIGN KEY ("huespedId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Propiedad" ADD CONSTRAINT "Propiedad_anfitrionId_fkey" FOREIGN KEY ("anfitrionId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
