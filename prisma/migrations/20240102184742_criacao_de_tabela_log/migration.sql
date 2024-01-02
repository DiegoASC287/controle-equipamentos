-- CreateTable
CREATE TABLE "Log" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);
