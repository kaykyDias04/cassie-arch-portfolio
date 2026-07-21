import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  // Verificação opcional de segurança com CRON_SECRET
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  try {
    // Consulta simples no banco de dados para evitar o pause automático do Supabase
    await prisma.$queryRaw`SELECT 1`;

    return NextResponse.json({
      success: true,
      message: 'Supabase mantido ativo com sucesso!',
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Erro ao pingar o Supabase:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Erro ao conectar ao banco de dados',
      },
      { status: 500 }
    );
  }
}
