-- AlterTable
ALTER TABLE "alugadas" ADD COLUMN     "limite" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "manutencoes" ALTER COLUMN "descricao" DROP NOT NULL,
ALTER COLUMN "tipo" DROP NOT NULL,
ALTER COLUMN "dataRealizacao" DROP NOT NULL,
ALTER COLUMN "contador" DROP NOT NULL,
ALTER COLUMN "custo" DROP NOT NULL;

-- AlterTable
ALTER TABLE "maquinas" ALTER COLUMN "nome" DROP NOT NULL,
ALTER COLUMN "modelo" DROP NOT NULL,
ALTER COLUMN "imagem" DROP NOT NULL,
ALTER COLUMN "imagem" SET DEFAULT 'https://source.unsplash.com/featured/300x300?backhoe',
ALTER COLUMN "origem" DROP NOT NULL,
ALTER COLUMN "contador" DROP NOT NULL,
ALTER COLUMN "unidade" DROP NOT NULL,
ALTER COLUMN "alimentacao" DROP NOT NULL;
