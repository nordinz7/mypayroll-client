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
      <p className="hover:bg-slate-400 w-full rounded-md">
        <span className="flex gap-1 items-center">{menu.icon}{menu.title}</span>
      </p>
    ))}

    </div>
}

export default SidebarMenu