import { AppSidebar } from "@/frontend/src/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@src/components/ui/sidebar";

import { usePage } from "@inertiajs/react";
import ToastListener from "@/frontend/src/components/toast-listener";
import { Toaster } from "@/frontend/src/components/ui/sonner";
import { useTheme } from "@/frontend/src/providers/theme-provider";

export default function ProtectedTemplate({ children }: any) {
  const { theme } = useTheme();
  const { props } = usePage();
  const { auth } = props as any;
  const models: any = props.models || [];

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" models={models} user={auth.user} />
      <SidebarInset>
        <div className="flex flex-col flex-1">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 md:gap-6 ">{children}</div>
          </div>
        </div>
      </SidebarInset>

      <ToastListener>
        <Toaster
          position="top-center"
          richColors={true}
          theme={theme}
          closeButton
        />
      </ToastListener>
    </SidebarProvider>
  );
}
