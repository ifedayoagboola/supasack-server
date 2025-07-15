import { PrismaClient } from '@prisma/client';
import { USER_ROLES, PERMISSION_RESOURCES, PERMISSION_ACTIONS, ROLE_LEVELS } from '../src/constants/roles.contant';

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
        console.log(`✅ Created store role: ${roleName} (ID: ${role.id})`);
      } else {
        console.log(`⏭️  Store role already exists: ${roleName} (ID: ${existingRole.id})`);
      }
    } catch (error) {
      console.error(`❌ Error creating store role ${roleName}:`, error);
    }
  }

  // Create user roles
  const userRolesData = [
    {
      name: USER_ROLES.SUPER_ADMIN,
      description: 'Full platform access with all permissions',
      level: ROLE_LEVELS[USER_ROLES.SUPER_ADMIN]
    },
    {
      name: USER_ROLES.ADMIN,
      description: 'Platform administration with limited super admin permissions',
      level: ROLE_LEVELS[USER_ROLES.ADMIN]
    },
    {
      name: USER_ROLES.MERCHANT,
      description: 'Store owner with store management permissions',
      level: ROLE_LEVELS[USER_ROLES.MERCHANT]
    },
    {
      name: USER_ROLES.CUSTOMER,
      description: 'Regular customer with basic shopping permissions',
      level: ROLE_LEVELS[USER_ROLES.CUSTOMER]
    },
    {
      name: USER_ROLES.DELIVERY_PARTNER,
      description: 'Delivery partner with order delivery permissions',
      level: ROLE_LEVELS[USER_ROLES.DELIVERY_PARTNER]
    }
  ];

  for (const roleData of userRolesData) {
    try {
      const existingRole = await prisma.userRole.findUnique({
        where: { name: roleData.name }
      });

      if (!existingRole) {
        const role = await prisma.userRole.create({
          data: roleData
        });
        console.log(`✅ Created user role: ${roleData.name} (ID: ${role.id})`);
      } else {
        console.log(`⏭️  User role already exists: ${roleData.name} (ID: ${existingRole.id})`);
      }
    } catch (error) {
      console.error(`❌ Error creating user role ${roleData.name}:`, error);
    }
  }

  // Create permissions
  const permissionsData = [
    // User permissions
    { name: 'users.create', resource: PERMISSION_RESOURCES.USERS, action: PERMISSION_ACTIONS.CREATE, description: 'Create new users' },
    { name: 'users.read', resource: PERMISSION_RESOURCES.USERS, action: PERMISSION_ACTIONS.READ, description: 'View user information' },
    { name: 'users.update', resource: PERMISSION_RESOURCES.USERS, action: PERMISSION_ACTIONS.UPDATE, description: 'Update user information' },
    { name: 'users.delete', resource: PERMISSION_RESOURCES.USERS, action: PERMISSION_ACTIONS.DELETE, description: 'Delete users' },
    { name: 'users.manage', resource: PERMISSION_RESOURCES.USERS, action: PERMISSION_ACTIONS.MANAGE, description: 'Manage all users' },

    // Store permissions
    { name: 'stores.create', resource: PERMISSION_RESOURCES.STORES, action: PERMISSION_ACTIONS.CREATE, description: 'Create new stores' },
    { name: 'stores.read', resource: PERMISSION_RESOURCES.STORES, action: PERMISSION_ACTIONS.READ, description: 'View store information' },
    { name: 'stores.update', resource: PERMISSION_RESOURCES.STORES, action: PERMISSION_ACTIONS.UPDATE, description: 'Update store information' },
    { name: 'stores.delete', resource: PERMISSION_RESOURCES.STORES, action: PERMISSION_ACTIONS.DELETE, description: 'Delete stores' },
    { name: 'stores.approve', resource: PERMISSION_RESOURCES.STORES, action: PERMISSION_ACTIONS.APPROVE, description: 'Approve store applications' },
    { name: 'stores.reject', resource: PERMISSION_RESOURCES.STORES, action: PERMISSION_ACTIONS.REJECT, description: 'Reject store applications' },

    // Product permissions
    { name: 'products.create', resource: PERMISSION_RESOURCES.PRODUCTS, action: PERMISSION_ACTIONS.CREATE, description: 'Create new products' },
    { name: 'products.read', resource: PERMISSION_RESOURCES.PRODUCTS, action: PERMISSION_ACTIONS.READ, description: 'View product information' },
    { name: 'products.update', resource: PERMISSION_RESOURCES.PRODUCTS, action: PERMISSION_ACTIONS.UPDATE, description: 'Update product information' },
    { name: 'products.delete', resource: PERMISSION_RESOURCES.PRODUCTS, action: PERMISSION_ACTIONS.DELETE, description: 'Delete products' },
    { name: 'products.approve', resource: PERMISSION_RESOURCES.PRODUCTS, action: PERMISSION_ACTIONS.APPROVE, description: 'Approve products' },

    // Order permissions
    { name: 'orders.create', resource: PERMISSION_RESOURCES.ORDERS, action: PERMISSION_ACTIONS.CREATE, description: 'Create new orders' },
    { name: 'orders.read', resource: PERMISSION_RESOURCES.ORDERS, action: PERMISSION_ACTIONS.READ, description: 'View order information' },
    { name: 'orders.update', resource: PERMISSION_RESOURCES.ORDERS, action: PERMISSION_ACTIONS.UPDATE, description: 'Update order status' },
    { name: 'orders.delete', resource: PERMISSION_RESOURCES.ORDERS, action: PERMISSION_ACTIONS.DELETE, description: 'Delete orders' },
    { name: 'orders.manage', resource: PERMISSION_RESOURCES.ORDERS, action: PERMISSION_ACTIONS.MANAGE, description: 'Manage all orders' },

    // Category permissions
    { name: 'categories.create', resource: PERMISSION_RESOURCES.CATEGORIES, action: PERMISSION_ACTIONS.CREATE, description: 'Create new categories' },
    { name: 'categories.read', resource: PERMISSION_RESOURCES.CATEGORIES, action: PERMISSION_ACTIONS.READ, description: 'View categories' },
    { name: 'categories.update', resource: PERMISSION_RESOURCES.CATEGORIES, action: PERMISSION_ACTIONS.UPDATE, description: 'Update categories' },
    { name: 'categories.delete', resource: PERMISSION_RESOURCES.CATEGORIES, action: PERMISSION_ACTIONS.DELETE, description: 'Delete categories' },

    // Report permissions
    { name: 'reports.read', resource: PERMISSION_RESOURCES.REPORTS, action: PERMISSION_ACTIONS.READ, description: 'View reports' },
    { name: 'reports.manage', resource: PERMISSION_RESOURCES.REPORTS, action: PERMISSION_ACTIONS.MANAGE, description: 'Manage all reports' },

    // Settings permissions
    { name: 'settings.read', resource: PERMISSION_RESOURCES.SETTINGS, action: PERMISSION_ACTIONS.READ, description: 'View platform settings' },
    { name: 'settings.update', resource: PERMISSION_RESOURCES.SETTINGS, action: PERMISSION_ACTIONS.UPDATE, description: 'Update platform settings' }
  ];

  for (const permissionData of permissionsData) {
    try {
      const existingPermission = await prisma.userPermission.findUnique({
        where: { name: permissionData.name }
      });

      if (!existingPermission) {
        const permission = await prisma.userPermission.create({
          data: permissionData
        });
        console.log(`✅ Created permission: ${permissionData.name} (ID: ${permission.id})`);
      } else {
        console.log(`⏭️  Permission already exists: ${permissionData.name} (ID: ${existingPermission.id})`);
      }
    } catch (error) {
      console.error(`❌ Error creating permission ${permissionData.name}:`, error);
    }
  }

  // Assign permissions to roles
  await assignPermissionsToRoles();

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

async function assignPermissionsToRoles() {
  console.log('🔐 Assigning permissions to roles...');

  try {
    // Get all roles and permissions
    const superAdminRole = await prisma.userRole.findUnique({ where: { name: USER_ROLES.SUPER_ADMIN } });
    const adminRole = await prisma.userRole.findUnique({ where: { name: USER_ROLES.ADMIN } });
    const merchantRole = await prisma.userRole.findUnique({ where: { name: USER_ROLES.MERCHANT } });
    const customerRole = await prisma.userRole.findUnique({ where: { name: USER_ROLES.CUSTOMER } });
    const deliveryRole = await prisma.userRole.findUnique({ where: { name: USER_ROLES.DELIVERY_PARTNER } });

    const allPermissions = await prisma.userPermission.findMany();

    // Super Admin gets all permissions
    if (superAdminRole) {
      await prisma.userRole.update({
        where: { id: superAdminRole.id },
        data: {
          permissions: {
            connect: allPermissions.map(p => ({ id: p.id }))
          }
        }
      });
      console.log(`✅ Assigned all permissions to ${USER_ROLES.SUPER_ADMIN}`);
    }

    // Admin gets most permissions except user management
    if (adminRole) {
      const adminPermissions = allPermissions.filter(p => 
        !p.name.startsWith('users.manage') && 
        !p.name.startsWith('users.delete')
      );
      await prisma.userRole.update({
        where: { id: adminRole.id },
        data: {
          permissions: {
            connect: adminPermissions.map(p => ({ id: p.id }))
          }
        }
      });
      console.log(`✅ Assigned admin permissions to ${USER_ROLES.ADMIN}`);
    }

    // Merchant gets store and product permissions
    if (merchantRole) {
      const merchantPermissions = allPermissions.filter(p => 
        p.name.startsWith('stores.') ||
        p.name.startsWith('products.') ||
        p.name.startsWith('orders.read') ||
        p.name.startsWith('orders.update')
      );
      await prisma.userRole.update({
        where: { id: merchantRole.id },
        data: {
          permissions: {
            connect: merchantPermissions.map(p => ({ id: p.id }))
          }
        }
      });
      console.log(`✅ Assigned merchant permissions to ${USER_ROLES.MERCHANT}`);
    }

    // Customer gets basic shopping permissions
    if (customerRole) {
      const customerPermissions = allPermissions.filter(p => 
        p.name.startsWith('products.read') ||
        p.name.startsWith('orders.create') ||
        p.name.startsWith('orders.read') ||
        p.name.startsWith('categories.read')
      );
      await prisma.userRole.update({
        where: { id: customerRole.id },
        data: {
          permissions: {
            connect: customerPermissions.map(p => ({ id: p.id }))
          }
        }
      });
      console.log(`✅ Assigned customer permissions to ${USER_ROLES.CUSTOMER}`);
    }

    // Delivery partner gets delivery-related permissions
    if (deliveryRole) {
      const deliveryPermissions = allPermissions.filter(p => 
        p.name.startsWith('orders.read') ||
        p.name.startsWith('orders.update')
      );
      await prisma.userRole.update({
        where: { id: deliveryRole.id },
        data: {
          permissions: {
            connect: deliveryPermissions.map(p => ({ id: p.id }))
          }
        }
      });
      console.log(`✅ Assigned delivery permissions to ${USER_ROLES.DELIVERY_PARTNER}`);
    }

  } catch (error) {
    console.error('❌ Error assigning permissions to roles:', error);
  }
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 