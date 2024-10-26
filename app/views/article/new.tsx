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

export default function New({ article }: any) {
  return (
    <>
      <Head title={`New article`} />

      <header className="flex gap-2 items-center pt-8 shrink-0">
        <div className="flex gap-2 items-center">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={routes.articles()}>Articles</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>New article</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="mt-2 w-2/3">
        <h1 className="text-4xl font-bold">New article</h1>

        <Form
          article={article}
          onSubmit={(form: any) => {
            form.transform((data: any) => ({ article: data }));
            form.post(routes.articles());
          }}
          submitText={`Create article`}
        />
      </div>
    </>
  );
}
