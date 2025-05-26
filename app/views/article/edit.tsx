import { Link, Head } from "@inertiajs/react";
import Form from "./form";
import * as routes from "@src/routes";
import { Button } from "@ui/button";
import { SiteHeader } from "@/frontend/src/components/common/site-header";

export default function Edit({ article }: any) {
  return (
    <>
      <Head title={`Editing article`} />
      <SiteHeader title={`Editing article`} />

      <div className="w-full px-4 lg:px-6">
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
      </div>
    </>
  );
}
