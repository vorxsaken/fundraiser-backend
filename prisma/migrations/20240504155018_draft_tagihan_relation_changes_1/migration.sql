-- DropForeignKey
ALTER TABLE "Pembayaran" DROP CONSTRAINT "Pembayaran_tagihanId_fkey";

-- AlterTable
ALTER TABLE "Pembayaran" ALTER COLUMN "tagihanId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Pembayaran" ADD CONSTRAINT "Pembayaran_tagihanId_fkey" FOREIGN KEY ("tagihanId") REFERENCES "Tagihan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
