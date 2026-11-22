/**
 * Faz o parse de datas ISO (`YYYY-MM-DD`) ao meio-dia local para evitar
 * deslocamento de fuso horário (ex.: `2025-07-01` virar `30/06` em UTC-3).
 */
export function parseProjectDate(dateStr: string): Date {
  const isoDateOnly = /^\d{4}-\d{2}-\d{2}$/;
  if (isoDateOnly.test(dateStr)) {
    return new Date(`${dateStr}T12:00:00`);
  }
  return new Date(dateStr);
}

/** Retorna o semestre letivo no formato `AAAA.1` ou `AAAA.2`. */
export function getProjectSemester(dateStr: string): string {
  const date = parseProjectDate(dateStr);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const half = month <= 6 ? 1 : 2;
  return `${year}.${half}`;
}

/** Formatação curta para cards de projeto (ex.: `mar. de 2025`). */
export function formatProjectCardDate(dateStr: string): string {
  return parseProjectDate(dateStr).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'short',
  });
}

/** Formatação completa para página de detalhes (ex.: `março de 2025`). */
export function formatProjectFullDate(dateStr: string): string {
  return parseProjectDate(dateStr).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
  });
}
