-- AlterTable
ALTER TABLE "notifications" ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isStored" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "store_id" TEXT;
