import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL || 'postgresql://admin:password123@localhost:5432/cassie_portfolio?schema=public';
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const projects = await prisma.project.findMany({
    select: { id: true, title: true, slug: true },
  });
  console.log(projects);
}

main().finally(() => prisma.$disconnect());
