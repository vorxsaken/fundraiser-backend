-- CreateTable
CREATE TABLE "DraftTagihan" (
    "id" SERIAL NOT NULL,
    "id_tagihan" INTEGER NOT NULL,
    "nominal" INTEGER NOT NULL,
    "metode_pembayaran" VARCHAR(30) NOT NULL,
    "principal" VARCHAR(30) NOT NULL,

    CONSTRAINT "DraftTagihan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DraftTagihan_id_tagihan_key" ON "DraftTagihan"("id_tagihan");

-- AddForeignKey
ALTER TABLE "DraftTagihan" ADD CONSTRAINT "DraftTagihan_id_tagihan_fkey" FOREIGN KEY ("id_tagihan") REFERENCES "Tagihan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
