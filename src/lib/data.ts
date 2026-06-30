import { prisma } from './prisma';
import { Project, AboutData } from './types';


export async function getProjects(): Promise<Project[]> {
  const projects = await prisma.project.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return projects.map(p => ({
    ...p,
    createdAt: p.createdAt.toISOString(),
  })) as Project[];
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const project = await prisma.project.findUnique({
    where: { slug },
  });

  if (!project) return null;

  return {
    ...project,
    createdAt: project.createdAt.toISOString(),
  } as Project;
}

export async function getProjectById(id: string): Promise<Project | null> {
  const project = await prisma.project.findUnique({
    where: { id },
  });

  if (!project) return null;

  return {
    ...project,
    createdAt: project.createdAt.toISOString(),
  } as Project;
}

export async function syncProjectSlugs() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'asc' },
  });

  for (let i = 0; i < projects.length; i++) {
    const project = projects[i];
    const baseSlug = project.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    const expectedSlug = `${baseSlug}-${i}`;
    
    if (project.slug !== expectedSlug) {
      await prisma.project.update({
        where: { id: project.id },
        data: { slug: expectedSlug },
      });
    }
  }
}

export async function addProject(projectData: Omit<Project, 'id' | 'slug' | 'createdAt'>): Promise<Project> {
  const tempSlug = `temp-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  const newProject = await prisma.project.create({
    data: {
      title: projectData.title,
      slug: tempSlug,
      date: projectData.date,
      category: projectData.category,
      coverImage: projectData.coverImage,
      content: projectData.content,
    },
  });

  await syncProjectSlugs();
  const syncedProject = await getProjectById(newProject.id);
  
  return syncedProject as Project;
}

export async function updateProject(id: string, data: Partial<Omit<Project, 'id' | 'createdAt'>>): Promise<Project | null> {
  await prisma.project.update({
    where: { id },
    data: { ...data },
  });

  await syncProjectSlugs();
  const syncedProject = await getProjectById(id);

  return syncedProject;
}

export async function deleteProject(id: string): Promise<boolean> {
  try {
    await prisma.project.delete({
      where: { id },
    });
    await syncProjectSlugs();
    return true;
  } catch (e) {
    return false;
  }
}


export async function getAboutData(): Promise<AboutData> {
  const data = await prisma.aboutData.findUnique({
    where: { id: 'singleton' },
  });

  if (!data) {
    const defaultData = {
      id: 'singleton',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80',
      paragraphs: [
        'Nascida e criada em Recife, <strong>Cassie Moretti</strong> sempre teve a arte como parte essencial de sua vida. Aos 10 anos, iniciou seus estudos na Academia Brasileira de Arte (ABRA), onde, ao longo de oito anos, se especializou em diversas técnicas, como desenho, pintura, xilogravura e fotografia.',
        'Sua paixão pela expressão artística a levou a cursar Artes Plásticas na FAAP, onde se formou em 2004. Incentivada pelo pai a expandir sua formação, também ingressou na faculdade de Arquitetura e Urbanismo no Mackenzie, concluindo a graduação em 2006.',
        'Em 2007, fundou a <strong>Cássia Victória</strong>, escritório que reflete seu olhar apurado e sua sensibilidade artística na criação de espaços funcionais e cheios de personalidade. Em 2017, descobriu sua paixão por compartilhar a rotina de projetos e obras e lançou o canal Cássia Victória, que rapidamente se tornou referência no segmento, conquistando um público fiel e apaixonado por arquitetura e design.',
        'Atualmente, o escritório está localizado na zona sul de Recife e conta com uma equipe de mais de 10 colaboradores, atuando em projetos residenciais, comerciais e corporativos. Sempre inovando e transformando espaços, Cassie segue inspirando pessoas por meio de seu trabalho e sua trajetória, unindo arte, arquitetura e comunicação.',
      ],
    };

    await prisma.aboutData.create({
      data: defaultData,
    });

    return defaultData;
  }

  return data as AboutData;
}

export async function updateAboutData(data: AboutData): Promise<AboutData> {
  const updated = await prisma.aboutData.upsert({
    where: { id: 'singleton' },
    update: {
      photo: data.photo,
      paragraphs: data.paragraphs,
    },
    create: {
      id: 'singleton',
      photo: data.photo,
      paragraphs: data.paragraphs,
    },
  });

  return updated as AboutData;
}
