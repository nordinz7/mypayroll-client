import { ThemeToggle } from "@/components/shared/theme-switcher";
import { useAuth } from "@/stores/useAuth";
import { FaUsers } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { generateUniqueId } from "@/utils";

const SidebarMenu = () => {
  const logout = useAuth((state) => state.logOut)
  const user = useAuth((state) => state.user)
  const navigate = useNavigate()

  const menulist: any = [
    {
      title: 'Employees',
      icon: <FaUsers />,
      link: '/'
    }
  ]

  menulist.push(
    {
      title: user?.name || 'Profile',
      icon: <FaUser />,
      link: '/profile'
    },
    {
      title: 'Theme',
      icon: <ThemeToggle />,
    },
    {
      title: 'Logout',
      icon: <IoIosLogOut />,
      action: logout
    }
  )

  const handleMenuClick = (menu: any) => {
    if (menu.link) {
      navigate(menu.link)
    }

    if (menu.action) {
      menu.action()
    }
  }

  return <div className="flex-col justify-between">
    {menulist.map((menu) => (
      <p className="w-full rounded-md p-2 hover:bg-gray-300/50 transition duration-150 ease-in-out hover:cursor-pointer" onClick={() => handleMenuClick(menu)} key={generateUniqueId()}>
        <span className="flex gap-2 items-center">{menu.icon}{menu.title}</span>
      </p>
    ))}
  </div>
}

export default SidebarMenu