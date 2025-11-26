import * as React from "react";
import {
  Citrus,
  ClipboardListIcon,
  Database,
  DatabaseIcon,
  FileIcon,
  HelpCircleIcon,
  HomeIcon,
  SearchIcon,
  SettingsIcon,
} from "lucide-react";

import { NavDocuments } from "@src/components/nav-documents";
import { NavMain } from "@src/components/nav-main";
import { NavSecondary } from "@src/components/nav-secondary";
import { NavUser } from "@src/components/nav-user";
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
  // AIDEV-NOTE: Dynamic sidebar data based on Rails models and authenticated user
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
      })),
    ],
    documents: [
      {
        name: "Data Library",
        url: "#",
        icon: DatabaseIcon,
      },
      {
        name: "Reports",
        url: "#",
        icon: ClipboardListIcon,
      },
      {
        name: "Documentation",
        url: "#",
        icon: FileIcon,
      },
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
                <div className="flex justify-center items-center rounded-lg aspect-square size-8 bg-primary text-primary-foreground">
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
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
