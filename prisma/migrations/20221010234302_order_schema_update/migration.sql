/*
  Warnings:

  - Added the required column `product_variant_spec_id` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order" ADD COLUMN     "product_variant_spec_id" TEXT NOT NULL,
ALTER COLUMN "status" DROP DEFAULT;
