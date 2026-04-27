import { BibleVerse, VERSES } from '../data/verses';

/**
 * Devuelve un número entero >= 0 único para cada fecha (YYYY-MM-DD, UTC).
 * Usamos el día del año desde una época fija para que todos los dispositivos
 * obtengan el mismo versículo el mismo día.
 */
function dayIndex(date: Date = new Date()): number {
  const start = Date.UTC(1970, 0, 1);
  const today = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  return Math.floor((today - start) / (1000 * 60 * 60 * 24));
}

export function getVerseForDate(date: Date = new Date()): BibleVerse {
  const idx = dayIndex(date) % VERSES.length;
  return VERSES[idx];
}

export function getTodayVerse(): BibleVerse {
  return getVerseForDate(new Date());
}

/** Clave ISO (YYYY-MM-DD) en hora local, útil para cachés diarios. */
export function todayKey(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}
