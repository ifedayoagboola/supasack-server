/*
  Warnings:

  - Added the required column `email` to the `stores` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_number` to the `stores` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postcode` to the `stores` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "stores" DROP CONSTRAINT "stores_user_id_fkey";

-- AlterTable
ALTER TABLE "stores" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "phone_number" TEXT NOT NULL,
ADD COLUMN     "postcode" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "stores" ADD CONSTRAINT "stores_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
