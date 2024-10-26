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

export default function Edit({ article }: any) {
  return (
    <>
      <Head title={`Editing article`} />

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
                <BreadcrumbPage>{article.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="mt-2 w-2/3">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">Editing article</h1>

          <Button variant="outline" className="ml-3" asChild>
            <Link href={routes.article(article.id)}>
              Show this article
            </Link>
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
