import { User } from '@src/interfaces/user';
import prisma from '@src/apis/middleware/db';
import { filter } from 'compression';

export const createUserRepo = async (userData: any): Promise<User> => {
  const { first_name, last_name, email, password, mobile } = userData;
  let createdUser = await prisma.user.create({
    data: {
      first_name,
      last_name,
      email,
      mobile,
      password,
      ...userData
    }
  });
  console.log(createdUser, 'createdUser');
  return createdUser as User ;
};

export const createBulkRepo = async (userData: any): Promise<User[]> => {
  await prisma.user.createMany({
    data: userData
  });
  return;
};

export const findAuthUser = async (filters: any): Promise<User | undefined> => {
  let user = await prisma.user.findFirst({
    where: { ...filters },
    include: {
      user_role: {
        include: {
          permissions: true
        }
      },
      permissions: true
    }
  });
  return user as User;
};

export const findUserRepo = async (filters: any): Promise<User | undefined> => {
  let user = await prisma.user.findFirst({
    where: { ...filters },
    include: {
      user_role: {
        include: {
          permissions: true
        }
      },
      permissions: true
    },
    orderBy: {
      created_at: 'desc'
    }
  });
  return user as User;
};

export const fetchUserDetailsRepo = async (filters: any): Promise<User | undefined> => {
  let user = await prisma.user.findFirst({
    where: { ...filters },
    include: {
      user_role: {
        include: {
          permissions: true
        }
      },
      permissions: true
    }
  });
  return user as User;
};

export const updateUserRepo = async (filters: any, data: any): Promise<User | undefined> => {
  console.log(data, "data")
  const updatedUser = await prisma.user.update({
    data: {
      ...data
    },
    where: { id: filters.id },
    include: {
      user_role: {
        include: {
          permissions: true
        }
      },
      permissions: true
    }
  });
  return updatedUser as User;
};

// New functions for role management
export const assignUserRoleRepo = async (userId: string, roleId: string): Promise<User | undefined> => {
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { user_role_id: roleId },
    include: {
      user_role: {
        include: {
          permissions: true
        }
      },
      permissions: true
    }
  });
  return updatedUser as User;
};

export const getUserRoleRepo = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      user_role: {
        include: {
          permissions: true
        }
      },
      permissions: true
    }
  });
  return user?.user_role;
};

export const getUserPermissionsRepo = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      user_role: {
        include: {
          permissions: true
        }
      },
      permissions: true
    }
  });

  const rolePermissions = user?.user_role?.permissions || [];
  const userPermissions = user?.permissions || [];

  return [...rolePermissions, ...userPermissions];
};
