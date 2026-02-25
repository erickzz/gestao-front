import type { LucideIcon } from "lucide-react";
import { Utensils, Home, Car, ShoppingCart, Tag } from "lucide-react";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  alimentação: Utensils,
  alimentacao: Utensils,
  moradia: Home,
  transporte: Car,
  transport: Car,
  compras: ShoppingCart,
  saúde: Tag,
  saude: Tag,
  lazer: Tag,
  educação: Tag,
  educacao: Tag,
};

export function getCategoryIcon(name: string): LucideIcon {
  const key = name.toLowerCase().trim();
  return CATEGORY_ICONS[key] ?? Tag;
}
