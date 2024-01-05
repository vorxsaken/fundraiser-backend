/*
  Warnings:

  - You are about to drop the column `siswaId` on the `Pembayaran` table. All the data in the column will be lost.
  - You are about to drop the column `siswaId` on the `Tagihan` table. All the data in the column will be lost.
  - You are about to drop the `Siswa` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Pembayaran` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Pembayaran` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Tagihan` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SISWA', 'ADMIN');

-- DropForeignKey
ALTER TABLE "Pembayaran" DROP CONSTRAINT "Pembayaran_siswaId_fkey";

-- DropForeignKey
ALTER TABLE "Tagihan" DROP CONSTRAINT "Tagihan_siswaId_fkey";

-- DropIndex
DROP INDEX "Pembayaran_siswaId_key";

-- AlterTable
ALTER TABLE "Pembayaran" DROP COLUMN "siswaId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Tagihan" DROP COLUMN "siswaId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Siswa";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "nama" VARCHAR(50) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "nis" VARCHAR(150) NOT NULL,
    "kelas" VARCHAR(30) NOT NULL,
    "tingkat" VARCHAR(30) NOT NULL,
    "angkatan" VARCHAR(30) NOT NULL,
    "alamat" VARCHAR(255) NOT NULL,
    "no_telp" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "foto" VARCHAR(255),
    "role" "Role" NOT NULL DEFAULT 'SISWA',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pembayaran_userId_key" ON "Pembayaran"("userId");

-- AddForeignKey
ALTER TABLE "Tagihan" ADD CONSTRAINT "Tagihan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pembayaran" ADD CONSTRAINT "Pembayaran_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
