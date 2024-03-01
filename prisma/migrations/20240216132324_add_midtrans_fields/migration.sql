-- AlterTable
ALTER TABLE "Pembayaran" ADD COLUMN     "bank" TEXT,
ADD COLUMN     "currency" TEXT,
ADD COLUMN     "fraud_status" TEXT,
ADD COLUMN     "gross_amount" TEXT,
ADD COLUMN     "merchant_id" TEXT,
ADD COLUMN     "order_id" TEXT,
ADD COLUMN     "payment_type" TEXT,
ADD COLUMN     "status_code" TEXT,
ADD COLUMN     "status_message" TEXT,
ADD COLUMN     "transaction_id" TEXT,
ADD COLUMN     "transaction_status" TEXT,
ADD COLUMN     "transaction_time" TEXT,
ADD COLUMN     "va_number" TEXT;
