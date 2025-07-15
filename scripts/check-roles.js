const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkRoles() {
  try {
    console.log('🔍 Checking roles and permissions...\n');

    // Check roles
    const roles = await prisma.userRole.findMany({
      include: {
        permissions: true,
        _count: {
          select: { users: true }
        }
      }
    });

    console.log('📋 ROLES:');
    roles.forEach(role => {
      console.log(`  - ${role.name} (Level: ${role.level}, Users: ${role._count.users})`);
      if (role.permissions.length > 0) {
        console.log(`    Permissions: ${role.permissions.map(p => p.name).join(', ')}`);
      }
    });

    console.log('\n🔐 PERMISSIONS:');
    const permissions = await prisma.userPermission.findMany();
    permissions.forEach(permission => {
      console.log(`  - ${permission.name} (${permission.resource}.${permission.action})`);
    });

    console.log('\n👥 USERS:');
    const users = await prisma.user.findMany({
      include: {
        user_role: true
      }
    });

    users.forEach(user => {
      const roleName = user.user_role ? user.user_role.name : 'No role assigned';
      console.log(`  - ${user.email} (${user.first_name} ${user.last_name}) - Role: ${roleName} - Active: ${user.active}`);
    });

  } catch (error) {
    console.error('Error checking roles:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkRoles(); 