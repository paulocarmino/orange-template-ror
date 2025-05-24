import { Link, Head } from "@inertiajs/react";
import Form from "./form";
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

      <header className="flex items-center gap-2 pt-8 shrink-0">
        <div className="flex items-center gap-2">
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

      <div className="w-2/3 mt-2">
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
