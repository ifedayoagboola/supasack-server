-- AlterTable
ALTER TABLE "products" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "stores" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;
