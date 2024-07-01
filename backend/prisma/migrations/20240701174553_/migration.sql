-- AlterTable
ALTER TABLE "Propiedad" ALTER COLUMN "fechaActualizacion" DROP NOT NULL,
ALTER COLUMN "nroDpto" SET DEFAULT '',
ALTER COLUMN "nroDpto" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Usuario" ALTER COLUMN "fechaActualizacion" DROP NOT NULL,
ALTER COLUMN "descripcion" DROP NOT NULL;
