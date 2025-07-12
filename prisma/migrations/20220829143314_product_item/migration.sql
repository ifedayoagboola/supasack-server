/*
  Warnings:

  - You are about to drop the `store_products` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "store_products";

-- CreateTable
CREATE TABLE "product_items" (
    "id" TEXT NOT NULL,
    "product_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_items_pkey" PRIMARY KEY ("id")
);
