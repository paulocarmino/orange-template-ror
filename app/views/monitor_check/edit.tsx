import { Link, Head } from '@inertiajs/react';
import Form from './Form';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@ui/breadcrumb"; 
import * as routes from "@src/routes"; 
import { Button } from "@ui/button"; 

export default function Edit({ monitor_check }: any) {
  return (
    <>
      <Head title={`Editing monitor check`} />

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
                <BreadcrumbPage>{monitor_check.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="mt-2 w-2/3">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">Editing monitor check</h1>

          <Button variant="outline" className="ml-3" asChild>
            <Link href={routes.monitor_check(monitor_check.id)}>
              Show this monitor check
            </Link>
          </Button>
        </div>

        <Form
          monitor_check={monitor_check}
          onSubmit={(form: any) => {
            form.transform((data: any) => ({ monitor_check: data }));
            form.patch(routes.monitor_check(monitor_check.id));
          }}
          submitText={`Update monitor check`}
        />
      </div>
    </>
  );
}
