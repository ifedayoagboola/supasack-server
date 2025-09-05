/*
  Warnings:

  - You are about to drop the column `quality` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `quality_alert` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "quality",
DROP COLUMN "quality_alert",
ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "quantity_alert" INTEGER;
