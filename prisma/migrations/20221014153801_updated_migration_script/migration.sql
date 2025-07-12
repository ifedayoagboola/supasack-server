/*
  Warnings:

  - The primary key for the `order` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `order` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `order_id` on the `delivery_information` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `order_reference` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "delivery_information" DROP CONSTRAINT "delivery_information_order_id_fkey";

-- AlterTable
ALTER TABLE "delivery_information" DROP COLUMN "order_id",
ADD COLUMN     "order_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "order" DROP CONSTRAINT "order_pkey",
ADD COLUMN     "order_reference" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "order_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "delivery_information_order_id_key" ON "delivery_information"("order_id");

-- AddForeignKey
ALTER TABLE "delivery_information" ADD CONSTRAINT "delivery_information_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
