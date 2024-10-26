import { Link, Head } from "@inertiajs/react";
import MonitorCheck from "./MonitorCheck";
import { Button } from "@ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@ui/breadcrumb";
import * as routes from "@src/routes";

export default function Show({ monitor_check }: any) {
  const onDestroy = (e: any) => {
    if (!confirm("Are you sure you want to delete this monitor check?")) {
      e.preventDefault();
    }
  };

  return (
    <>
      <Head title={`Monitor check #${monitor_check.id}`} />

      <header className="flex gap-2 items-center pt-8 shrink-0">
        <div className="flex gap-2 items-center">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={routes.monitor_checks()}>Monitor checks</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{`Monitor check ${monitor_check.id}`}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="mt-2 w-2/3">
        <div className="mx-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold">{`Monitor check ${monitor_check.id}`}</h1>
            <div className="flex gap-2">
              <Button asChild variant="default">
                <Link href={routes.edit_monitor_check(monitor_check.id)}>Edit</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link
                  href={routes.monitor_check(monitor_check.id)}
                  method="delete"
                  onClick={onDestroy}
                  as="button"
                >
                  Destroy this monitor check
                </Link>
              </Button>
            </div>
          </div>
          <MonitorCheck monitor_check={monitor_check} />
        </div>
      </div>
    </>
  );
}
