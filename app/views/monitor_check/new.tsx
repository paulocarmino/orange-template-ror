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

export default function New({ monitor_check }: any) {
  return (
    <>
      <Head title={`New monitor check`} />

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
                <BreadcrumbPage>New monitor check</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="mt-2 w-2/3">
        <h1 className="text-4xl font-bold">New monitor check</h1>

        <Form
          monitor_check={monitor_check}
          onSubmit={(form: any) => {
            form.transform((data: any) => ({ monitor_check: data }));
            form.post(routes.monitor_checks());
          }}
          submitText={`Create monitor check`}
        />
      </div>
    </>
  );
}
