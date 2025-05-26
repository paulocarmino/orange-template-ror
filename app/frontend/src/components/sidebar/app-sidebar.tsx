import * as React from "react";
import {
  Citrus,
  Database,
  HelpCircleIcon,
  HomeIcon,
  SearchIcon,
  SettingsIcon,
} from "lucide-react";

import { NavMain } from "@/frontend/src/components/sidebar/nav-main";
import { NavSecondary } from "@/frontend/src/components/sidebar/nav-secondary";
import { NavUser } from "@/frontend/src/components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@src/components/ui/sidebar";
import * as routes from "@src/routes";
import { Link } from "@inertiajs/react";

type AppSidebarProps = {
  models: string[];
  user: any;
} & React.ComponentProps<typeof Sidebar>;

export function AppSidebar({ variant, models, user }: AppSidebarProps) {
  const data = {
    user: {
      name: user.full_name,
      email: user.email,
      avatar: "https://ui.shadcn.com/avatars/shadcn.jpg",
    },
    navMain: [
      {
        title: "Dashboard",
        url: "/",
        icon: HomeIcon,
      },
      ...models.map((model: any) => ({
        title: model,
        url: `/${model
          .replace(/([A-Z])/g, "_$1")
          .toLowerCase()
          .replace(/^_/, "")}`,
        icon: Database,
        isActive: false,
        items: [],
      })),
    ],
    navSecondary: [
      {
        title: "Settings",
        url: "#",
        icon: SettingsIcon,
      },
      {
        title: "Get Help",
        url: "#",
        icon: HelpCircleIcon,
      },
      {
        title: "Search",
        url: "#",
        icon: SearchIcon,
      },
    ],
  };

  return (
    <Sidebar collapsible="offcanvas" variant={variant}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href={routes.root()}>
                <div className="flex items-center justify-center rounded-lg aspect-square size-8 bg-primary text-primary-foreground">
                  <Citrus className="size-4" />
                </div>
                <div className="grid flex-1 text-sm leading-tight text-left">
                  <span className="font-semibold truncate">orangeTemplate</span>
                  <span className="text-xs truncate">
                    React & Rails (Inertia)
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
