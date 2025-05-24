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
import { Button } from "@ui/button";

export default function Edit({ article }: any) {
  return (
    <>
      <Head title={`Editing article`} />

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
                <BreadcrumbPage>{article.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="w-2/3 mt-2">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">Editing article</h1>

          <Button variant="outline" className="ml-3" asChild>
            <Link href={routes.article(article.id)}>Show this article</Link>
          </Button>
        </div>

        <Form
          article={article}
          onSubmit={(form: any) => {
            form.transform((data: any) => ({ article: data }));
            form.patch(routes.article(article.id));
          }}
          submitText={`Update article`}
        />
      </div>
    </>
  );
}
