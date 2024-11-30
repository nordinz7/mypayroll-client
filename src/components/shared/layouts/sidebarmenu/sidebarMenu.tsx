import { authStore } from "@/stores/auth";
import { FaUsers } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { createAvatar, generateUniqueId } from "@/utils";
import { lowerCase, startCase, upperFirst } from "lodash";
import { Theme, themeStore } from "@/stores/theme";
import { Moon, Sun } from "lucide-react";
import { useMemo } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type SideMenuItem = {
  title: string;
  icon: JSX.Element;
  link?: string;
  action?: () => void;
  position?: "start" | "middle" | "end";
};

const SidebarMenu = () => {
  const setStartLoggingOut = authStore((state) => state.setStartLoggingOut);
  const user = authStore((state) => state.user);
  const theme = themeStore((state) => state.theme);
  const setTheme = themeStore((state) => state.setTheme);
  const navigate = useNavigate();
  const themes = useMemo(() => Object.values(Theme), []);

  const handleThemeChange = (theme: Theme) => {
    const index = themes.indexOf(theme);
    const nextIndex = (index + 1) % themes.length;
    const nextTheme = themes[nextIndex];
    setTheme(nextTheme);
  };

  const menulist: SideMenuItem[] = [
    {
      title: "Employees",
      icon: <FaUsers />,
      link: "/",
    },
  ];

  menulist.push(
    {
      title: user?.name || "Profile",
      icon: (
        <Avatar className="w-3 h-3">
          <AvatarFallback>{createAvatar(user?.name)}</AvatarFallback>
        </Avatar>
      ),
      link: `/userProfile/${user?.uuid}`,
      position: "end",
    },
    {
      title: `${theme} theme`,
      icon: theme === "light" ? <Sun size={12} /> : <Moon size={12} />,
      action: () => handleThemeChange(theme),
      position: "end",
    },
    {
      title: "Logout",
      icon: <IoIosLogOut />,
      action: () => setStartLoggingOut(true),
      position: "end",
    }
  );
  const groupedItems = {
    start: menulist.filter(
      (item) => item.position === "start" || !item.position
    ),
    middle: menulist.filter((item) => item.position === "middle"),
    end: menulist.filter((item) => item.position === "end"),
  };

  const handleMenuClick = (menu: any) => {
    if (menu.link) {
      navigate(menu.link);
    }

    if (menu.action) {
      menu.action();
    }
  };

  const renderMenuItem = (menu: SideMenuItem) => {
    return (
      <p
        className="w-full rounded-md p-2 hover:bg-gray-300/50 transition duration-150 ease-in-out hover:cursor-pointer"
        onClick={() => handleMenuClick(menu)}
        key={generateUniqueId()}
      >
        <span className="flex gap-2 items-center text-xs">
          {menu.icon}
          <span className="menu-title">
            {upperFirst(lowerCase(startCase(menu.title)))}
          </span>
        </span>
      </p>
    );
  };

  return (
    <div className="flex flex-col h-full justify-between pt-2 pb-2 bg-[#f5f5f4] dark:bg-[#040217]">
      <div>{groupedItems.start.map(renderMenuItem)}</div>
      <div className="flex-grow flex flex-col justify-center">
        {groupedItems.middle.map(renderMenuItem)}
      </div>
      <div>{groupedItems.end.map(renderMenuItem)}</div>
    </div>
  );
};

export default SidebarMenu;
