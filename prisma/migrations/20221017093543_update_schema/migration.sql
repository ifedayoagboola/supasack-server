/*
  Warnings:

  - You are about to drop the column `order_id` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `payment_processor_id` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the `DeliveryProcessor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `payment_processor` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `status` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `amount` on the `transactions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "cart" ALTER COLUMN "amount" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "order" ALTER COLUMN "amount" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "product_variant_spec" ALTER COLUMN "amount" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "order_id",
DROP COLUMN "payment_processor_id",
ADD COLUMN     "completed_at" TIMESTAMP(3),
ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "store_id" TEXT,
ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT,
DROP COLUMN "amount",
ADD COLUMN     "amount" DECIMAL(65,30) NOT NULL,
ALTER COLUMN "meta" DROP NOT NULL;

-- DropTable
DROP TABLE "DeliveryProcessor";

-- DropTable
DROP TABLE "payment_processor";

-- CreateTable
CREATE TABLE "processor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "processor_pkey" PRIMARY KEY ("id")
);
