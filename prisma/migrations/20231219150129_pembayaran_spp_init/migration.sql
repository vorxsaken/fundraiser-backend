-- CreateEnum
CREATE TYPE "StatusPembayaran" AS ENUM ('BELUM_LUNAS', 'LUNAS');

-- CreateTable
CREATE TABLE "Siswa" (
    "id" SERIAL NOT NULL,
    "nama" VARCHAR(50) NOT NULL,
    "nis" INTEGER NOT NULL,
    "kelas" VARCHAR(30) NOT NULL,
    "tingkat" VARCHAR(30) NOT NULL,
    "angkatan" VARCHAR(30) NOT NULL,
    "alamat" VARCHAR(255) NOT NULL,
    "no_telp" INTEGER NOT NULL,
    "email" VARCHAR(50) NOT NULL,

    CONSTRAINT "Siswa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tagihan" (
    "id" SERIAL NOT NULL,
    "judul_tagihan" VARCHAR(150) NOT NULL,
    "total_tagihan" INTEGER NOT NULL,
    "tenggat_waktu" TIMESTAMP(3) NOT NULL,
    "siswaId" INTEGER NOT NULL,
    "status" "StatusPembayaran" NOT NULL DEFAULT 'BELUM_LUNAS',

    CONSTRAINT "Tagihan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pembayaran" (
    "id" SERIAL NOT NULL,
    "siswaId" INTEGER NOT NULL,
    "tagihanId" INTEGER NOT NULL,
    "nominal" INTEGER NOT NULL,
    "tanggal_bayar" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metode_bayar" VARCHAR(50) NOT NULL,

    CONSTRAINT "Pembayaran_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pembayaran_siswaId_key" ON "Pembayaran"("siswaId");

-- AddForeignKey
ALTER TABLE "Tagihan" ADD CONSTRAINT "Tagihan_siswaId_fkey" FOREIGN KEY ("siswaId") REFERENCES "Siswa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pembayaran" ADD CONSTRAINT "Pembayaran_tagihanId_fkey" FOREIGN KEY ("tagihanId") REFERENCES "Tagihan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pembayaran" ADD CONSTRAINT "Pembayaran_siswaId_fkey" FOREIGN KEY ("siswaId") REFERENCES "Siswa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
