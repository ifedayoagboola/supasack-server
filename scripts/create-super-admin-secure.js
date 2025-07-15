const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();

async function createSuperAdmin() {
  try {
    // Check if ADMIN_KEY is set
    if (!process.env.ADMIN_KEY) {
      console.error('❌ ADMIN_KEY environment variable is not set.');
      console.log('Please set ADMIN_KEY in your .env file:');
      console.log('ADMIN_KEY=your-secure-admin-key-here');
      return;
    }

    // Get user email from command line argument
    const userEmail = process.argv[2];
    
    if (!userEmail) {
      console.log('Usage: ADMIN_KEY=your-key node scripts/create-super-admin-secure.js <user-email>');
      console.log('Example: ADMIN_KEY=my-secret-key node scripts/create-super-admin-secure.js admin@supasack.com');
      return;
    }

    console.log('🔐 Verifying admin key...');

    // Check if SUPER_ADMIN role exists
    let superAdminRole = await prisma.userRole.findUnique({
      where: { name: 'SUPER_ADMIN' }
    });

    if (!superAdminRole) {
      console.log('❌ SUPER_ADMIN role not found. Please run the seed script first:');
      console.log('npm run db:seed');
      return;
    }

    // Find the user
    const user = await prisma.user.findFirst({
      where: { email: userEmail },
      include: { user_role: true }
    });

    if (!user) {
      console.log(`❌ User with email ${userEmail} not found.`);
      return;
    }

    // Check if user is already a super admin
    if (user.user_role && user.user_role.name === 'SUPER_ADMIN') {
      console.log(`ℹ️  User ${userEmail} is already a SUPER_ADMIN.`);
      return;
    }

    // Assign SUPER_ADMIN role to user
    await prisma.user.update({
      where: { id: user.id },
      data: { user_role_id: superAdminRole.id }
    });

    console.log(`✅ Successfully promoted ${userEmail} to SUPER_ADMIN role.`);
    console.log(`User ID: ${user.id}`);
    console.log(`Role: ${superAdminRole.name}`);

  } catch (error) {
    console.error('❌ Error creating super admin:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

createSuperAdmin(); 