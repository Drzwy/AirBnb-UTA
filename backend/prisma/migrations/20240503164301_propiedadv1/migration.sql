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
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "Propiedad_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Propiedad" ADD CONSTRAINT "Propiedad_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
