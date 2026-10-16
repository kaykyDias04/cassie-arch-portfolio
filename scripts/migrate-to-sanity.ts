/**
 * Script de migração automática dos dados locais (data/projects.json e data/about.json)
 * diretamente para o Sanity.io.
 *
 * Como executar:
 *   SANITY_API_WRITE_TOKEN="seu-token-aqui" npx tsx scripts/migrate-to-sanity.ts
 */

import fs from 'fs';
import path from 'path';

// Carrega automaticamente o arquivo .env se existir
const envPath = path.join(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  if (typeof process.loadEnvFile === 'function') {
    try {
      process.loadEnvFile(envPath);
    } catch {
      // Ignora erro se variáveis já estiverem definidas
    }
  }
  // Fallback caso alguma variável ainda não tenha sido populada
  const content = fs.readFileSync(envPath, 'utf-8');
  for (const rawLine of content.split('\n')) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const eqIdx = line.indexOf('=');
    if (eqIdx !== -1) {
      const key = line.slice(0, eqIdx).trim();
      let val = line.slice(eqIdx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  }
}

import { createClient } from '@sanity/client';
import { htmlToBlocks } from '@portabletext/block-tools';
import { JSDOM } from 'jsdom';
import { schemaTypes } from '../src/sanity/schemas';
import { ABOUT_DOCUMENT_ID } from '../src/sanity/schemas/about';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || projectId === 'placeholder') {
  console.error('❌ Defina a variável NEXT_PUBLIC_SANITY_PROJECT_ID no seu .env ou na linha de comando.');
  process.exit(1);
}

if (!token) {
  console.error('❌ Defina a variável SANITY_API_WRITE_TOKEN (Token de escrita gerado no sanity.io/manage).');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2026-10-15',
  useCdn: false,
});

// Encontra o tipo de campo content para block-tools
const projectSchema = schemaTypes.find((t) => t.name === 'project') as any;
const contentField = projectSchema?.fields?.find((f: any) => f.name === 'content');
const blockContentType = contentField?.type;

const aboutSchema = schemaTypes.find((t) => t.name === 'about') as any;
const bioField = aboutSchema?.fields?.find((f: any) => f.name === 'bio');
const bioContentType = bioField?.type;

async function uploadImageFromUrl(imageUrl: string, filename = 'image.jpg') {
  try {
    console.log(`  ⬇️  Baixando imagem: ${imageUrl.slice(0, 60)}...`);
    const res = await fetch(imageUrl);
    if (!res.ok) throw new Error(`Falha no download da imagem (${res.status})`);
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    console.log(`  ⬆️  Enviando para o CDN do Sanity...`);
    const asset = await client.assets.upload('image', buffer, {
      filename,
    });
    return asset;
  } catch (err: any) {
    console.error(`  ⚠️  Erro no upload da imagem ${imageUrl}:`, err.message);
    return null;
  }
}

import crypto from 'crypto';

function ensureKeys(item: any): any {
  if (Array.isArray(item)) {
    return item.map((child) => {
      const formatted = ensureKeys(child);
      if (typeof formatted === 'object' && formatted !== null) {
        if (!formatted._key) {
          formatted._key = crypto.randomBytes(6).toString('hex');
        }
      }
      return formatted;
    });
  }
  if (typeof item === 'object' && item !== null) {
    const copy: any = { ...item };
    for (const [k, v] of Object.entries(copy)) {
      copy[k] = ensureKeys(v);
    }
    return copy;
  }
  return item;
}

async function convertHtmlToBlocks(html: string, blockType: any) {
  try {
    const blocks = htmlToBlocks(html, blockType, {
      parseHtml: (htmlStr) => new JSDOM(htmlStr).window.document,
      rules: [
        {
          deserialize(el, next, block) {
            if ((el as HTMLElement).tagName?.toLowerCase() === 'img') {
              const src = (el as HTMLElement).getAttribute('src') || '';
              const alt = (el as HTMLElement).getAttribute('alt') || '';
              return block({
                _type: 'image',
                alt,
                _tempSrc: src,
              });
            }
            return undefined;
          },
        },
      ],
    });
    return ensureKeys(blocks);
  } catch (err) {
    // Fallback: parágrafos simples
    return ensureKeys([
      {
        _type: 'block',
        children: [{ _type: 'span', text: html.replace(/<[^>]+>/g, '') }],
        markDefs: [],
        style: 'normal',
      },
    ]);
  }
}

async function migrateAbout() {
  console.log('\n📄 [1/2] Migrando Sobre Mim...');
  const aboutPath = path.join(process.cwd(), 'data', 'about.json');
  if (!fs.existsSync(aboutPath)) {
    console.log('  ⚠️ Arquivo data/about.json não encontrado. Pulando.');
    return;
  }

  const raw = fs.readFileSync(aboutPath, 'utf-8');
  const aboutData = JSON.parse(raw);

  // Upload da foto de perfil
  let photoAsset = null;
  if (aboutData.photo) {
    photoAsset = await uploadImageFromUrl(aboutData.photo, 'perfil-cassia.jpg');
  }

  // Converter biografia (parágrafos HTML para Portable Text)
  const bioHtml = (aboutData.paragraphs || []).map((p: string) => `<p>${p}</p>`).join('');
  const bioBlocks = await convertHtmlToBlocks(bioHtml, bioContentType);

  const doc = {
    _id: ABOUT_DOCUMENT_ID,
    _type: 'about',
    bio: ensureKeys(bioBlocks),
    areasOfFocus: [
      'Conforto Bioclimático',
      'Design Contemporâneo',
      'Identidade Urbana',
    ],
    ...(photoAsset
      ? {
          photo: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: photoAsset._id,
            },
            hotspot: { x: 0.5, y: 0.5, height: 1, width: 1 },
          },
        }
      : {}),
  };

  await client.createOrReplace(doc);
  console.log('  ✅ Documento "Sobre Mim" salvo com sucesso no Sanity!');
}

async function migrateProjects() {
  console.log('\n🏗️ [2/2] Migrando Projetos...');
  const projectsPath = path.join(process.cwd(), 'data', 'projects.json');
  if (!fs.existsSync(projectsPath)) {
    console.log('  ⚠️ Arquivo data/projects.json não encontrado. Pulando.');
    return;
  }

  const raw = fs.readFileSync(projectsPath, 'utf-8');
  const projects = JSON.parse(raw);

  for (const item of projects) {
    console.log(`\n  👉 Processando projeto: "${item.title}"`);

    // Upload imagem de capa
    let coverAsset = null;
    if (item.coverImage) {
      coverAsset = await uploadImageFromUrl(item.coverImage, `${item.slug}-cover.jpg`);
    }

    // Converter conteúdo HTML em blocos
    const blocks: any[] = await convertHtmlToBlocks(item.content || '', blockContentType);

    // Fazer upload de imagens inline detectadas no conteúdo
    for (const b of blocks) {
      if (b._type === 'image' && b._tempSrc) {
        const inlineAsset = await uploadImageFromUrl(b._tempSrc, `${item.slug}-detail.jpg`);
        if (inlineAsset) {
          b.asset = { _type: 'reference', _ref: inlineAsset._id };
        }
        delete b._tempSrc;
      }
    }

    const doc = {
      _id: `project-${item.slug}`,
      _type: 'project',
      title: item.title,
      slug: {
        _type: 'slug',
        current: item.slug,
      },
      date: item.date,
      category: item.category,
      content: ensureKeys(blocks),
      ...(coverAsset
        ? {
            coverImage: {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: coverAsset._id,
              },
              hotspot: { x: 0.5, y: 0.5, height: 1, width: 1 },
            },
          }
        : {}),
    };

    await client.createOrReplace(doc);
    console.log(`  ✅ Projeto "${item.title}" importado com sucesso!`);
  }
}

async function main() {
  console.log('🚀 Iniciando migração para o Sanity.io...');
  console.log(`   Projeto: ${projectId}`);
  console.log(`   Dataset: ${dataset}`);

  await migrateAbout();
  await migrateProjects();

  console.log('\n🎉 Migração concluída com sucesso! Acesse /admin para conferir.');
}

main().catch((err) => {
  console.error('\n❌ Erro durante a migração:', err);
  process.exit(1);
});
