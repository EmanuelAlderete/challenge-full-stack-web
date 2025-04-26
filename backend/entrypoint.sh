echo "Generating Prisma Client..."
npx prisma generate

echo "Running mirgration..."
npx prisma migrate dev

echo "Starting Server"
npm run dev
