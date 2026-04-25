import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create superadmin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.admin.upsert({
    where: { email: 'admin@brr.co.id' },
    update: {},
    create: {
      name: 'Super Admin',
      email: 'admin@brr.co.id',
      password: hashedPassword,
      role: 'superadmin',
    },
  });
  console.log(`✅ Admin created: ${admin.email} (${admin.role})`);

  console.log('\n🎉 Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
