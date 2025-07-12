-- AlterTable
ALTER TABLE "product_variants" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';

-- CreateTable
CREATE TABLE "Advert" (
    "id" TEXT NOT NULL,
    "store_name" TEXT NOT NULL,
    "product_link" TEXT NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "Advert_pkey" PRIMARY KEY ("id")
);
