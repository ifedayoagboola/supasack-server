/*
  Warnings:

  - Added the required column `address` to the `address_book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "address_book" ADD COLUMN     "address" TEXT NOT NULL;
