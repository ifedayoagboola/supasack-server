import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create store roles
  const storeRoles = ['OWNER', 'ATTENDANT', 'MANAGER'];
  
  for (const roleName of storeRoles) {
    try {
      const existingRole = await prisma.role.findUnique({
        where: { role: roleName }
      });

      if (!existingRole) {
        const role = await prisma.role.create({
          data: { role: roleName }
        });
        console.log(`✅ Created role: ${roleName} (ID: ${role.id})`);
      } else {
        console.log(`⏭️  Role already exists: ${roleName} (ID: ${existingRole.id})`);
      }
    } catch (error) {
      console.error(`❌ Error creating role ${roleName}:`, error);
    }
  }

  // Create default categories and subcategories
  const categoriesData = [
    {
      name: 'Smartphones',
      subcategories: ['iPhone', 'Samsung Galaxy', 'Google Pixel', 'Android Smartphones', 'Smartphone accessories']
    },
    {
      name: 'Laptops',
      subcategories: ['MacBook', 'Windows laptops', 'Peripherals and accessories']
    },
    {
      name: 'Tablets',
      subcategories: ['iPad', 'Samsung Galaxy Tab', 'Android Tablet', 'Tablet accessories']
    },
    {
      name: 'Game consoles',
      subcategories: ['PlayStation', 'Nintendo', 'Xbox', 'Video games', 'Console accessories']
    },
    {
      name: 'Smartwatches',
      subcategories: ['Apple Watch', 'Samsung Galaxy Watch', 'Apple Watch accessories']
    },
    {
      name: 'Audio',
      subcategories: ['AirPod', 'Earphones', 'Headphones', 'Speakers']
    },
    {
      name: 'More',
      subcategories: ['Desktop computers', 'Retro tech', 'Cameras', 'Mobility', 'TVs and home cinema']
    }
  ];

  for (const categoryData of categoriesData) {
    try {
      // Check if category already exists
      const existingCategory = await prisma.category.findFirst({
        where: { category: categoryData.name }
      });

      if (!existingCategory) {
        const category = await prisma.category.create({
          data: {
            category: categoryData.name,
            img_url: null // You can add default images later
          }
        });
        console.log(`✅ Created category: ${categoryData.name} (ID: ${category.id})`);

        // Create subcategories as separate categories
        for (const subcategoryName of categoryData.subcategories) {
          try {
            const subcategory = await prisma.category.create({
              data: {
                category: subcategoryName,
                img_url: null
              }
            });
            console.log(`  ✅ Created subcategory: ${subcategoryName} (ID: ${subcategory.id})`);
          } catch (error) {
            console.error(`  ❌ Error creating subcategory ${subcategoryName}:`, error);
          }
        }
      } else {
        console.log(`⏭️  Category already exists: ${categoryData.name} (ID: ${existingCategory.id})`);
      }
    } catch (error) {
      console.error(`❌ Error creating category ${categoryData.name}:`, error);
    }
  }

  console.log('🎉 Database seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 