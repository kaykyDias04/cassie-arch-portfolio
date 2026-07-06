'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { addProject, updateProject, deleteProject, updateAboutData } from './data';
import { AboutData } from './types';

import { SignJWT, jwtVerify } from 'jose';

const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'password123';
const SESSION_COOKIE = 'admin-session';
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-dev-secret-change-in-production'
);


export async function loginAction(formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    const token = await new SignJWT({ sub: username })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(JWT_SECRET);

    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, token, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
    redirect('/admin/dashboard');
  }

  return { error: 'Credenciais inválidas. Tente novamente.' };
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect('/admin');
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE);

  if (!session?.value) return false;

  try {
    await jwtVerify(session.value, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}


async function fileToBase64(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const mimeType = file.type || 'image/jpeg';
  return `data:${mimeType};base64,${buffer.toString('base64')}`;
}


export async function createProjectAction(formData: FormData) {
  const title = formData.get('title') as string;
  const date = formData.get('date') as string;
  const category = formData.get('category') as 'Arquitetura' | 'Urbanismo' | 'Interiores';
  const content = formData.get('content') as string;
  const coverFile = formData.get('coverImage') as File | null;

  if (!title || !date || !category || !content) {
    return { error: 'Todos os campos são obrigatórios.' };
  }

  let coverImage = '';
  if (coverFile && coverFile.size > 0) {
    coverImage = await fileToBase64(coverFile);
  } else {
    return { error: 'A imagem de capa é obrigatória.' };
  }

  await addProject({ title, date, category, coverImage, content });

  revalidatePath('/projetos');
  revalidatePath('/');
  redirect('/admin/dashboard');
}

export async function updateProjectAction(formData: FormData) {
  const id = formData.get('id') as string;
  const title = formData.get('title') as string;
  const date = formData.get('date') as string;
  const category = formData.get('category') as 'Arquitetura' | 'Urbanismo' | 'Interiores';
  const content = formData.get('content') as string;
  const coverFile = formData.get('coverImage') as File | null;
  const existingCover = formData.get('existingCoverImage') as string;

  if (!id || !title || !date || !category || !content) {
    return { error: 'Todos os campos são obrigatórios.' };
  }

  let coverImage = existingCover || '';
  if (coverFile && coverFile.size > 0) {
    coverImage = await fileToBase64(coverFile);
  }

  if (!coverImage) {
    return { error: 'A imagem de capa é obrigatória.' };
  }

  await updateProject(id, { title, date, category, coverImage, content });

  revalidatePath('/projetos');
  revalidatePath('/');
  redirect('/admin/dashboard');
}

export async function deleteProjectAction(id: string) {
  await deleteProject(id);

  revalidatePath('/projetos');
  revalidatePath('/');
  redirect('/admin/dashboard');
}


export async function updateAboutAction(formData: FormData) {
  const paragraphsRaw = formData.get('paragraphs') as string;
  const photoFile = formData.get('photo') as File | null;
  const existingPhoto = formData.get('existingPhoto') as string;

  if (!paragraphsRaw) {
    return { error: 'O conteúdo do sobre é obrigatório.' };
  }

  let photo = existingPhoto || '';
  if (photoFile && photoFile.size > 0) {
    photo = await fileToBase64(photoFile);
  }

  const paragraphs = paragraphsRaw.split('\n\n').filter((p) => p.trim() !== '');

  const aboutData: AboutData = {
    photo,
    paragraphs,
  };

  await updateAboutData(aboutData);

  revalidatePath('/sobre');
  redirect('/admin/dashboard');
}
