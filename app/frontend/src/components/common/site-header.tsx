import { ModeToggle } from "@/frontend/src/components/mode-toggle";
import { Separator } from "@src/components/ui/separator";
import { SidebarTrigger } from "@src/components/ui/sidebar";

export function SiteHeader({ title }: any) {
  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex items-center w-full gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{title}</h1>
      </div>
      <div className="flex items-center mr-4">
        <ModeToggle />
      </div>
    </header>
  );
}
