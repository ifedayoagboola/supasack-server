# Supasack - African & Caribbean Food Marketplace Backend

Supasack is a multi-vendor marketplace that makes it easy to find and order African, Caribbean, and other minority food items—from multiple local shops in one app—with doorstep delivery.

## Features

- **Multi-vendor marketplace** - Order from multiple stores in one transaction
- **African & Caribbean food focus** - Specialized categories and search
- **Real-time delivery tracking** - Integrated logistics and delivery management
- **Escrow payment system** - Secure payments with vendor protection
- **Store management** - Complete vendor onboarding and management
- **User authentication** - Secure login with OAuth support
- **Rating & review system** - Community-driven quality assurance
- **Notification system** - Real-time updates for orders and deliveries

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with OAuth support
- **Payment**: Paystack integration
- **Logistics**: Sendbox integration
- **Email**: Nodemailer with templates

## Setup Instructions

1. Clone the repository
2. Run `npm install` to install dependencies
3. Copy `.example.env` to `.env` and configure environment variables
4. Run `npm run db:migrate` to set up the database
5. Run `npm run db:seed` to seed initial data (categories, roles, etc.)
6. Run `npm run start:dev` to start the development server

## Environment Variables

Create a `.env` file with the following variables:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/supasack"
JWT_SECRET="your-jwt-secret"
PAYSTACK_SECRET_KEY="your-paystack-secret"
SENDBOX_API_KEY="your-sendbox-api-key"
EMAIL_HOST="smtp.gmail.com"
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-email-password"
```

## Database Management

- **Prisma commands**: Use `npx prisma` for database operations
- **Migrations**: `npm run db:migrate` to apply schema changes
- **Seed data**: `npm run db:seed` to populate initial data
- **Studio**: `npx prisma studio` to view/edit data

## API Documentation

The API follows RESTful conventions with the following main endpoints:

- `/api/v1/auth` - Authentication endpoints
- `/api/v1/store` - Store management
- `/api/v1/product` - Product catalog
- `/api/v1/cart` - Shopping cart
- `/api/v1/order` - Order management
- `/api/v1/payment` - Payment processing
- `/api/v1/delivery` - Delivery tracking

## Development

- **Code formatting**: `npm run format` to format code with Prettier
- **Type checking**: TypeScript compilation with `npm run build`
- **Hot reload**: Development server with `npm run start:dev`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

