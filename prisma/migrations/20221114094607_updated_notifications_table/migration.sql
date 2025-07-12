/*
  Warnings:

  - You are about to drop the column `isStored` on the `notifications` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "notifications" DROP COLUMN "isStored",
ADD COLUMN     "isStore" BOOLEAN NOT NULL DEFAULT true;
