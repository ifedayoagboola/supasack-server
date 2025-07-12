/*
  Warnings:

  - Added the required column `order_reference` to the `delivery_information` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "delivery_information" ADD COLUMN     "order_reference" TEXT NOT NULL;
