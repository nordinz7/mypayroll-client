import { ThemeToggle } from "@/components/shared/theme-switcher";
import { FaUsers } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const menulist:any = [
  {
    title: 'Employees',
    icon: <FaUsers />,
    link: '/'
  }
]

menulist.push(
  {
    icon: <ThemeToggle/>,
    link: '#'
  },
  {
    icon: <IoIosLogOut/>,
    link: '/login'
  }
)

const SidebarMenu = () => {
  const navigate = useNavigate()

  return <div className="flex-col justify-between">
 {menulist.map((menu, index) => (
  <p className="w-full rounded-md p-2 hover:bg-gray-300/50 transition duration-150 ease-in-out" onClick={()=> navigate(menu.link)}>
    <span className="flex gap-1 items-center">{menu.icon}{menu.title}</span>
  </p>
))}
    </div>
}

export default SidebarMenu