/*
  Warnings:

  - You are about to drop the column `amount` on the `product_variants` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `product_variants` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `product_variants` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "product_variants" DROP COLUMN "amount",
DROP COLUMN "quantity",
DROP COLUMN "size",
ALTER COLUMN "status" SET DEFAULT 'INACTIVE';

-- CreateTable
CREATE TABLE "product_variant_spec" (
    "id" TEXT NOT NULL,
    "size" INTEGER,
    "quantity" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "product_variant_id" TEXT NOT NULL,

    CONSTRAINT "product_variant_spec_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "product_variant_spec" ADD CONSTRAINT "product_variant_spec_product_variant_id_fkey" FOREIGN KEY ("product_variant_id") REFERENCES "product_variants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
