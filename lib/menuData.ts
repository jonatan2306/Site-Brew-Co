import { readFileSync } from 'fs';
import { join } from 'path';
import { type MenuCategory, type MenuItem, CATEGORY_ORDER } from './menuTypes';

export type { MenuCategory, MenuItem };
export { CATEGORY_ORDER };

function parseRow(row: string): string[] {
  const fields: string[] = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < row.length; i++) {
    const ch = row[i];
    if (ch === '"') {
      if (inQuotes && row[i + 1] === '"') {
        field += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === ',' && !inQuotes) {
      fields.push(field);
      field = '';
    } else {
      field += ch;
    }
  }
  fields.push(field);
  return fields;
}

export function parseMenuCsv(): MenuItem[] {
  try {
    const filePath = join(process.cwd(), 'docs/menu-items.csv');
    const content = readFileSync(filePath, 'utf-8');
    const lines = content.split('\n').map(l => l.trim()).filter(Boolean);

    return lines.slice(1).map(line => {
      const [categorie, nom, description, rawPrix, badge] = parseRow(line);
      const prix = parseFloat(rawPrix);
      return {
        categorie: categorie as MenuCategory,
        nom,
        description,
        prix: isNaN(prix) ? 0 : prix,
        badge: badge || null,
      };
    });
  } catch {
    return [];
  }
}

export function getFeaturedItems(): MenuItem[] {
  const featured = parseMenuCsv().filter(
    item => item.badge === 'Populaire' || item.badge === 'Favori de la maison'
  );
  return featured.slice(0, 4);
}
