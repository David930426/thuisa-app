import {
  CalendarDays,
  ClipboardList,
  Flag,
  Globe2,
  Home,
  LifeBuoy,
  Plane,
  School,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";

/**
 * Lets the data files in `lib/` name an icon as a plain string instead of
 * importing React components into content.
 */
const icons: Record<string, LucideIcon> = {
  users: Users,
  calendar: CalendarDays,
  globe: Globe2,
  lifebuoy: LifeBuoy,
  flag: Flag,
  plane: Plane,
  clipboard: ClipboardList,
  school: School,
  home: Home,
  wallet: Wallet,
};

export function Icon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Component = icons[name] ?? Users;
  return <Component className={className} aria-hidden />;
}
