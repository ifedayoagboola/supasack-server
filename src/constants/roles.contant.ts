// Store-specific roles (for vendors/merchants)
export enum STORE_ROLES {
  OWNER = 'OWNER',
  ATTENDANT = 'ATTENDANT',
  MANAGER = 'MANAGER'
}

// User roles (platform-wide)
export enum USER_ROLES {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  MERCHANT = 'MERCHANT',
  CUSTOMER = 'CUSTOMER',
  DELIVERY_PARTNER = 'DELIVERY_PARTNER'
}

// Permission resources
export enum PERMISSION_RESOURCES {
  USERS = 'users',
  STORES = 'stores',
  PRODUCTS = 'products',
  ORDERS = 'orders',
  PAYMENTS = 'payments',
  CATEGORIES = 'categories',
  NOTIFICATIONS = 'notifications',
  REPORTS = 'reports',
  SETTINGS = 'settings',
  DELIVERY = 'delivery'
}

// Permission actions
export enum PERMISSION_ACTIONS {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
  APPROVE = 'approve',
  REJECT = 'reject',
  MANAGE = 'manage'
}

// Role levels (0 = lowest, 100 = highest)
export const ROLE_LEVELS = {
  [USER_ROLES.SUPER_ADMIN]: 100,
  [USER_ROLES.ADMIN]: 80,
  [USER_ROLES.MERCHANT]: 60,
  [USER_ROLES.DELIVERY_PARTNER]: 40,
  [USER_ROLES.CUSTOMER]: 20
} as const;
