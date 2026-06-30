import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL || 'postgresql://admin:password123@localhost:5432/cassie_portfolio?schema=public';
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Iniciando migração de dados do JSON para o Postgres...');

  // Migrar About Data
  const aboutPath = path.join(process.cwd(), 'data', 'about.json');
  if (fs.existsSync(aboutPath)) {
    const rawAbout = fs.readFileSync(aboutPath, 'utf-8');
    const aboutData = JSON.parse(rawAbout);

    await prisma.aboutData.upsert({
      where: { id: 'singleton' },
      update: {
        photo: aboutData.photo,
        paragraphs: aboutData.paragraphs,
      },
      create: {
        id: 'singleton',
        photo: aboutData.photo,
        paragraphs: aboutData.paragraphs,
      },
    });
    console.log('✅ About data migrado com sucesso.');
  } else {
    console.log('⚠️ Arquivo about.json não encontrado, pulando...');
  }

  // Migrar Projects
  const projectsPath = path.join(process.cwd(), 'data', 'projects.json');
  if (fs.existsSync(projectsPath)) {
    const rawProjects = fs.readFileSync(projectsPath, 'utf-8');
    const projects = JSON.parse(rawProjects);

    if (projects.length > 0) {
      for (const project of projects) {
        // Checar se já existe pelo slug
        const existing = await prisma.project.findUnique({
          where: { slug: project.slug },
        });

        if (!existing) {
          await prisma.project.create({
            data: {
              id: project.id,
              title: project.title,
              slug: project.slug,
              date: project.date,
              category: project.category,
              coverImage: project.coverImage,
              content: project.content,
              createdAt: project.createdAt ? new Date(project.createdAt) : new Date(),
            },
          });
          console.log(`✅ Projeto migrado: ${project.title}`);
        } else {
          console.log(`⚠️ Projeto já existe no banco: ${project.title}`);
        }
      }
      console.log(`✅ ${projects.length} projetos processados.`);
    } else {
      console.log('⚠️ Nenhum projeto encontrado no arquivo JSON.');
    }
  } else {
    console.log('⚠️ Arquivo projects.json não encontrado, pulando...');
  }

  console.log('🎉 Migração finalizada!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
