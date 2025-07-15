import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting Supasack database seeding...');

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

  // Create African and Caribbean food categories
  const categoriesData = [
    {
      name: 'Grains & Cereals',
      subcategories: ['Rice', 'Yam', 'Cassava', 'Plantain', 'Corn', 'Millet', 'Sorghum', 'Fonio', 'Teff']
    },
    {
      name: 'Fresh Produce',
      subcategories: ['Vegetables', 'Fruits', 'Herbs', 'Spices', 'Root Vegetables', 'Leafy Greens']
    },
    {
      name: 'Meat & Seafood',
      subcategories: ['Beef', 'Goat', 'Lamb', 'Chicken', 'Fish', 'Shrimp', 'Crab', 'Snails', 'Offal']
    },
    {
      name: 'Dairy & Eggs',
      subcategories: ['Milk', 'Cheese', 'Yogurt', 'Eggs', 'Butter', 'Cream']
    },
    {
      name: 'Legumes & Beans',
      subcategories: ['Black Beans', 'Kidney Beans', 'Chickpeas', 'Lentils', 'Cowpeas', 'Bambara Nuts']
    },
    {
      name: 'Spices & Seasonings',
      subcategories: ['Pepper', 'Curry', 'Thyme', 'Bay Leaves', 'Nutmeg', 'Cinnamon', 'Ginger', 'Garlic', 'Onions']
    },
    {
      name: 'Oils & Fats',
      subcategories: ['Palm Oil', 'Groundnut Oil', 'Coconut Oil', 'Shea Butter', 'Ghee']
    },
    {
      name: 'Beverages',
      subcategories: ['Tea', 'Coffee', 'Juices', 'Traditional Drinks', 'Wine', 'Beer']
    },
    {
      name: 'Snacks & Sweets',
      subcategories: ['Chips', 'Nuts', 'Dried Fruits', 'Traditional Snacks', 'Candies', 'Chocolates']
    },
    {
      name: 'Frozen Foods',
      subcategories: ['Frozen Vegetables', 'Frozen Meat', 'Frozen Fish', 'Ready Meals']
    },
    {
      name: 'Canned & Preserved',
      subcategories: ['Canned Tomatoes', 'Canned Beans', 'Pickled Vegetables', 'Jams', 'Preserves']
    },
    {
      name: 'Bakery & Pastries',
      subcategories: ['Bread', 'Cakes', 'Pastries', 'Cookies', 'Traditional Breads']
    },
    {
      name: 'Condiments & Sauces',
      subcategories: ['Hot Sauce', 'Ketchup', 'Mustard', 'Traditional Sauces', 'Dips']
    },
    {
      name: 'Health & Wellness',
      subcategories: ['Herbal Teas', 'Supplements', 'Organic Foods', 'Gluten-Free', 'Vegan']
    },
    {
      name: 'Household & Cleaning',
      subcategories: ['Cleaning Supplies', 'Personal Care', 'Kitchen Essentials', 'Storage']
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

  console.log('🎉 Supasack database seeding completed!');
  console.log('🍽️  Ready to serve African & Caribbean food marketplace!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 