-- CreateEnum
CREATE TYPE "TipoUsuario" AS ENUM ('Cliente', 'Administrador');

-- CreateEnum
CREATE TYPE "EstadoSolicitudHospedaje" AS ENUM ('EN_ESPERA', 'ACEPTADO', 'RECHAZADO');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaActualizacion" TIMESTAMP(3),
    "estaActivo" BOOLEAN NOT NULL DEFAULT true,
    "tipoUsuario" "TipoUsuario" NOT NULL DEFAULT 'Cliente',
    "email" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "run" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellidoPat" TEXT NOT NULL,
    "apellidoMat" TEXT NOT NULL,
    "descripcion" TEXT,
    "idiomas" TEXT[],
    "detalles" TEXT[],

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Propiedad" (
    "id" SERIAL NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaActualizacion" TIMESTAMP(3),
    "estaActivo" BOOLEAN NOT NULL DEFAULT true,
    "dormitorios" INTEGER NOT NULL,
    "camas" INTEGER NOT NULL,
    "banos" INTEGER NOT NULL,
    "maxAdultos" INTEGER NOT NULL,
    "maxNinos" INTEGER NOT NULL,
    "maxBebes" INTEGER NOT NULL,
    "maxMascotas" INTEGER NOT NULL,
    "fechasOcupadas" DATE[],
    "precioNoche" DOUBLE PRECISION NOT NULL,
    "tipo" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "pais" TEXT NOT NULL,
    "ciudad" TEXT NOT NULL,
    "calle" TEXT NOT NULL,
    "nroCasa" INTEGER NOT NULL,
    "nroDpto" TEXT NOT NULL DEFAULT '',
    "comodidades" TEXT[],
    "opcionesDeSeguridad" TEXT[],
    "opcionesDeLlegada" TEXT[],
    "reglas" TEXT[],
    "fotos" TEXT[],
    "anfitrionId" INTEGER NOT NULL,

    CONSTRAINT "Propiedad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hospedaje" (
    "id" SERIAL NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estaActivo" BOOLEAN NOT NULL DEFAULT true,
    "estadoAceptacion" "EstadoSolicitudHospedaje" NOT NULL DEFAULT 'EN_ESPERA',
    "fechaIni" DATE NOT NULL,
    "fechaFin" DATE NOT NULL,
    "nochesDeEstadia" INTEGER NOT NULL,
    "costoNoche" DOUBLE PRECISION NOT NULL,
    "nroAdultos" INTEGER NOT NULL DEFAULT 1,
    "nroNinos" INTEGER NOT NULL DEFAULT 0,
    "nroBebes" INTEGER NOT NULL DEFAULT 0,
    "nroMascotas" INTEGER NOT NULL DEFAULT 0,
    "costoHospedaje" DOUBLE PRECISION NOT NULL,
    "tarifaServicio" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "tarifaLimpieza" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "metodoDePagoId" INTEGER NOT NULL,
    "usuarioPagadorId" INTEGER NOT NULL,
    "huespedId" INTEGER NOT NULL,
    "propiedadId" INTEGER NOT NULL,

    CONSTRAINT "Hospedaje_pkey" PRIMARY KEY ("id","huespedId","propiedadId")
);

-- CreateTable
CREATE TABLE "MetodoDePago" (
    "id" SERIAL NOT NULL,
    "infoTarjeta" TEXT NOT NULL,
    "propietarioId" INTEGER NOT NULL,

    CONSTRAINT "MetodoDePago_pkey" PRIMARY KEY ("id","propietarioId")
);

-- CreateTable
CREATE TABLE "ValoracionUsuario" (
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estaActivo" BOOLEAN NOT NULL DEFAULT true,
    "descripcion" TEXT,
    "puntuacion" INTEGER NOT NULL,
    "usuarioCreadorId" INTEGER NOT NULL,
    "usuarioCriticadoId" INTEGER NOT NULL,

    CONSTRAINT "ValoracionUsuario_pkey" PRIMARY KEY ("usuarioCreadorId","usuarioCriticadoId")
);

-- CreateTable
CREATE TABLE "ValoracionPropiedad" (
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estaActivo" BOOLEAN NOT NULL DEFAULT true,
    "descripcion" TEXT,
    "puntuacion" INTEGER NOT NULL,
    "usuarioCreadorId" INTEGER NOT NULL,
    "propiedadCriticadaId" INTEGER NOT NULL,

    CONSTRAINT "ValoracionPropiedad_pkey" PRIMARY KEY ("usuarioCreadorId","propiedadCriticadaId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_run_key" ON "Usuario"("run");

-- CreateIndex
CREATE UNIQUE INDEX "Propiedad_pais_ciudad_calle_nroCasa_nroDpto_key" ON "Propiedad"("pais", "ciudad", "calle", "nroCasa", "nroDpto");

-- AddForeignKey
ALTER TABLE "Propiedad" ADD CONSTRAINT "Propiedad_anfitrionId_fkey" FOREIGN KEY ("anfitrionId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hospedaje" ADD CONSTRAINT "Hospedaje_metodoDePagoId_usuarioPagadorId_fkey" FOREIGN KEY ("metodoDePagoId", "usuarioPagadorId") REFERENCES "MetodoDePago"("id", "propietarioId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hospedaje" ADD CONSTRAINT "Hospedaje_huespedId_fkey" FOREIGN KEY ("huespedId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hospedaje" ADD CONSTRAINT "Hospedaje_propiedadId_fkey" FOREIGN KEY ("propiedadId") REFERENCES "Propiedad"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MetodoDePago" ADD CONSTRAINT "MetodoDePago_propietarioId_fkey" FOREIGN KEY ("propietarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ValoracionUsuario" ADD CONSTRAINT "ValoracionUsuario_usuarioCreadorId_fkey" FOREIGN KEY ("usuarioCreadorId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ValoracionUsuario" ADD CONSTRAINT "ValoracionUsuario_usuarioCriticadoId_fkey" FOREIGN KEY ("usuarioCriticadoId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ValoracionPropiedad" ADD CONSTRAINT "ValoracionPropiedad_usuarioCreadorId_fkey" FOREIGN KEY ("usuarioCreadorId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ValoracionPropiedad" ADD CONSTRAINT "ValoracionPropiedad_propiedadCriticadaId_fkey" FOREIGN KEY ("propiedadCriticadaId") REFERENCES "Propiedad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
