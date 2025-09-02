import { ProfileDropdownLink } from "@/typings";
import { HelpIcon, ShoppingCartIcon, StatisticsIcon, UserIcon } from "@/images";

export const dropdownLinks: ProfileDropdownLink[] = [
  { id: 1, name: "Мій профіль", icon: <UserIcon />, query: "about" },
  {
    id: 2,
    name: "Історія покупок",
    icon: <ShoppingCartIcon />,
    query: "history",
  },
  {
    id: 3,
    name: "Моя статистика",
    icon: <StatisticsIcon />,
    query: "statistics",
  },
  { id: 4, name: "Технічна підтримка", icon: <HelpIcon />, query: "support" },
];
