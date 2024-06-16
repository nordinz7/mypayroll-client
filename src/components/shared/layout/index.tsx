import { Outlet } from 'react-router-dom'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import SidebarMenu from '@/components/shared/layout/sidebarMenu'

type LayoutProps = {
}

const index = (props: LayoutProps) => {
  return (
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[100vh] min-w-[100vw] max-w-md rounded-lg border"
      >
        <ResizablePanel defaultSize={10} maxSize={10} minSize={3}>
          <div className="flex h-full items-start justify-center p-6">
            <SidebarMenu />
          </div>
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