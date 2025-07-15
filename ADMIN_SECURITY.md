# Admin Security Guide

## 🔐 Security Overview

This document outlines the security measures for admin management in Supasack.

## 🚨 Security Vulnerabilities Fixed

### Previous Issue
- Anyone with codebase access could run `npm run create-admin` to promote themselves to super admin
- This was a major security vulnerability

### Current Security Measures
1. **Environment Variable Protection**: Admin key must be set in `.env` file
2. **API Endpoint Protection**: Admin creation requires valid admin key
3. **Audit Logging**: All admin actions are logged
4. **Role-Based Access Control**: Strict permission system

## 🔑 Setting Up Admin Security

### 1. Set Admin Key
Add to your `.env` file:
```env
ADMIN_KEY=your-very-secure-random-key-here
```

**Security Requirements:**
- Minimum 32 characters
- Mix of uppercase, lowercase, numbers, and special characters
- Never commit to version control
- Use different keys for different environments

### 2. Create First Super Admin

**Option A: Using Secure Script (Recommended)**
```bash
# Set admin key in environment
export ADMIN_KEY=your-secure-key

# Run the script
npm run create-admin your-email@example.com
```

**Option B: Using API Endpoint**
```bash
curl -X POST http://localhost:3210/v1/admin/create-super-admin \
  -H "Content-Type: application/json" \
  -d '{
    "adminKey": "your-secure-key",
    "userEmail": "your-email@example.com"
  }'
```

## 🛡️ Security Best Practices

### For Development
1. **Never commit admin keys** to version control
2. **Use different keys** for development, staging, and production
3. **Rotate keys regularly** (every 90 days)
4. **Limit access** to admin scripts and endpoints

### For Production
1. **Use strong, randomly generated keys**
2. **Store keys securely** (use secret management services)
3. **Monitor admin actions** through logs
4. **Implement rate limiting** on admin endpoints
5. **Use HTTPS** for all admin communications

### For Team Management
1. **Document key management** procedures
2. **Limit admin access** to trusted team members only
3. **Regular security audits** of admin actions
4. **Backup admin keys** securely

## 📋 Admin Role Hierarchy

```
SUPER_ADMIN (Level 100)
├── Full platform access
├── Can manage all users, roles, permissions
├── Can access all admin endpoints
└── Can create other super admins

ADMIN (Level 80)
├── Limited admin access
├── Can view platform statistics
├── Can manage stores and products
└── Cannot create super admins

MERCHANT (Level 60)
├── Store management
├── Product management
└── Order management

CUSTOMER (Level 20)
├── Shopping and orders
└── Basic user features

DELIVERY_PARTNER (Level 40)
├── Delivery management
└── Order tracking
```

## 🔍 Monitoring and Auditing

### Log Files
- All admin actions are logged to `logs/combined.log`
- Admin promotions are logged with user details
- Failed admin attempts are logged for security monitoring

### Audit Trail
- User role changes are tracked
- Admin key usage is logged
- Failed authentication attempts are monitored

## 🚨 Emergency Procedures

### If Admin Key is Compromised
1. **Immediately rotate** the admin key
2. **Review logs** for unauthorized access
3. **Audit all admin actions** since last known good state
4. **Consider revoking** suspicious admin privileges

### If Super Admin Account is Compromised
1. **Immediately disable** the compromised account
2. **Create new super admin** with fresh credentials
3. **Audit all actions** performed by compromised account
4. **Review and update** security procedures

## 📞 Security Contacts

For security issues:
- Create a private issue in the repository
- Contact the security team directly
- Do not post security issues publicly

## 🔄 Regular Security Tasks

### Monthly
- Review admin access logs
- Audit admin user list
- Update security documentation

### Quarterly
- Rotate admin keys
- Review and update permissions
- Conduct security training

### Annually
- Full security audit
- Update security policies
- Review and update admin procedures 