-- DropForeignKey
ALTER TABLE "product_variant_spec" DROP CONSTRAINT "product_variant_spec_product_variant_id_fkey";

-- AddForeignKey
ALTER TABLE "product_variant_spec" ADD CONSTRAINT "product_variant_spec_product_variant_id_fkey" FOREIGN KEY ("product_variant_id") REFERENCES "product_variants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
