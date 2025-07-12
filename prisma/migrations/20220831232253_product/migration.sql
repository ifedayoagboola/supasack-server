/*
  Warnings:

  - Added the required column `reference` to the `payout_account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `payout_account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `payout_account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "payout_account" ADD COLUMN     "reference" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;
