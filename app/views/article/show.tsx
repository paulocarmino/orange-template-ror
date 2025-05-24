import { Link, Head } from "@inertiajs/react";
import Article from "./article";
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

export default function Show({ article }: any) {
  const onDestroy = (e: any) => {
    if (!confirm("Are you sure you want to delete this article?")) {
      e.preventDefault();
    }
  };

  return (
    <>
      <Head title={`Article #${article.id}`} />

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
                <BreadcrumbPage>{`Article ${article.id}`}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="w-2/3 mt-2">
        <div className="mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold">{`Article ${article.id}`}</h1>
            <div className="flex gap-2">
              <Button asChild variant="default">
                <Link href={routes.edit_article(article.id)}>Edit</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link
                  href={routes.article(article.id)}
                  method="delete"
                  onClick={onDestroy}
                  as="button"
                >
                  Destroy this article
                </Link>
              </Button>
            </div>
          </div>
          <Article article={article} />
        </div>
      </div>
    </>
  );
}
