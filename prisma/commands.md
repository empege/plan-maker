# Prisma

## Prisma generate

npx prisma generate

## Migration

npx prisma migrate dev --name init
npx prisma migrate dev --name add_name_to_user

## Migration reset - Delete the table and recreate migration from start

npx prisma migrate reset
