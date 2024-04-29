-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "correo" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "nombre" TEXT,
    "apellidoPat" TEXT,
    "apellidoMat" TEXT,
    "tipo_usuario" TEXT NOT NULL DEFAULT 'User',

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_correo_key" ON "Usuario"("correo");
