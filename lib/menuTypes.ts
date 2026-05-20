export type MenuCategory = 'Boissons Espresso' | 'Boissons Froides' | 'Pâtisseries' | 'Sandwiches';

export interface MenuItem {
  categorie: MenuCategory;
  nom: string;
  description: string;
  prix: number;
  badge: string | null;
}

export const CATEGORY_ORDER: MenuCategory[] = [
  'Boissons Espresso',
  'Boissons Froides',
  'Pâtisseries',
  'Sandwiches',
];
