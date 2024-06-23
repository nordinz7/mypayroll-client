import { Outlet } from 'react-router-dom'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import SidebarMenu from '@/components/shared/layouts/sidebarmenu/sidebarMenu'

type LayoutProps = {
}

const index = (props: LayoutProps) => {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[100vh] min-w-[100vw] max-w-md border dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-[#e7e5e4] shadow-lg dark:shadow-none overflow-hidden"
    >
      <ResizablePanel defaultSize={10} maxSize={10} minSize={3}>
        <SidebarMenu />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={90}>
        <div className="flex h-full items-center justify-center p-6">
          <Outlet />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default index