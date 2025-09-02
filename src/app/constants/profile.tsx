import { ProfileDropdownLink } from "@/typings";
import { HelpIcon, ShoppingCartIcon, StatisticsIcon, UserIcon } from "@/images";
import About from "../(main)/profile/about";
import Support from "../(main)/profile/Support";
import Statistics from "../(main)/profile/Statistics";
import History from "../(main)/profile/History";
import { ReactElement } from "react";

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

export const profileTitles: {
  [key in string]: string;
} = {
  about: "Про мене",
  history: "Мої покупки",
  statistics: "Моя активність",
  support: "Технічна підтримка",
};

export const profileContents: {
  [key in string]: ReactElement;
} = {
  about: <About />,
  history: <History />,
  statistics: <Statistics />,
  support: <Support />,
};
