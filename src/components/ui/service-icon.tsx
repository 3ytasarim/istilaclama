import {
  BedDouble, Briefcase, Bug, Building, Building2, CalendarCheck, Factory, Hotel, House, Layers3,
  Rat, Shield, Shirt, Snail, Sprout, Store, UtensilsCrossed, Warehouse, Worm, Droplets, Fan, CircleDot,
  type LucideIcon, type LucideProps,
} from "lucide-react";
import type { IconKey } from "@/types/content";

const MAP: Record<IconKey, LucideIcon> = {
  bug: Bug,
  shield: Shield,
  rat: Rat,
  flea: CircleDot,
  bed: BedDouble,
  ant: Worm,
  mosquito: Fan,
  tick: Snail,
  silverfish: Droplets,
  moth: Shirt,
  scorpion: Bug,
  home: House,
  building: Building,
  buildings: Building2,
  office: Briefcase,
  store: Store,
  garden: Sprout,
  basement: Layers3,
  restaurant: UtensilsCrossed,
  hotel: Hotel,
  warehouse: Warehouse,
  factory: Factory,
  calendar: CalendarCheck,
  layers: Layers3,
};

export function ServiceIcon({ name, ...props }: { name: IconKey } & LucideProps) {
  const Icon = MAP[name];
  return <Icon aria-hidden="true" strokeWidth={1.75} {...props} />;
}
