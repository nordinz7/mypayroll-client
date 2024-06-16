import { ThemeToggle } from "@/components/shared/theme-switcher";
import { FaUsers } from "react-icons/fa6";

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
  }
)

const SidebarMenu = () => {
  return <div className="flex-col justify-between">
 {menulist.map((menu, index) => (
  <p className="w-full rounded-md p-2 hover:bg-gray-300/50 transition duration-150 ease-in-out">
    <span className="flex gap-1 items-center">{menu.icon}{menu.title}</span>
  </p>
))}

    </div>
}

export default SidebarMenu