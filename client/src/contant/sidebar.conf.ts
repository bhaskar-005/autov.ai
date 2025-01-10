import {
  BoxesIcon,
  Calendar,
  ChartLineIcon,
  CreditCard,
  FileVideoIcon,
  LayoutDashboard,
  ListTree,
  LogOut,
  LucideLink2,
  Settings,
  User,
} from "lucide-react";

// Menu items.
export const group1 = [
  {
    title: "dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Analytics",
    url: "/dashboard",
    icon: ChartLineIcon,
  },
];
export const group2 = [
  {
    title: "Projects",
    url: "/dashboard/projects",
    icon: FileVideoIcon,
  },
  {
    title: "Integration",
    url: "/dashboard/integration",
    icon: LucideLink2,
  },
  {
    title: "Name Space",
    url: "/dashboard/namespace",
    icon: ListTree,
  },
  {
    title: "Calendar",
    url: "/dashboard/calendar",
    icon: Calendar,
  },
];
export const group3 = [
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
  {
    title: "Templates",
    url: "#",
    icon: BoxesIcon,
  },
];

//for sidebar footer.
export const userAvatarDropdown = [
  {
    title: "Billing",
    icon: CreditCard,
    onclick: () => {},
  },
  {
    title: "Profile",
    icon: User,
    onclick: () => {},
  },
  {
    title: "Log Out",
    icon: LogOut,
    onclick: () => {},
  },
];
