import { Link, Head } from "@inertiajs/react";
import Form from "./form";
import * as routes from "@src/routes";
import { Button } from "@ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";
import { SiteHeader } from "@/frontend/src/components/common/site-header";
import { ArrowLeft, Eye } from "lucide-react";

interface EditProps {
  article: any;
  isModal?: boolean;
  onSuccess?: () => void;
}

export default function Edit({ article, isModal = false, onSuccess }: EditProps) {
  if (isModal) {
    return (
      <Form
        article={article}
        onSubmit={(form: any) => {
          form.transform((data: any) => ({ article: data }));
          form.patch(routes.article(article.id));
        }}
        onSuccess={onSuccess}
        submitText="Update article"
      />
    );
  }

  return (
    <>
      <Head title="Editing article" />
      <SiteHeader title="Editing article" />

      <div className="w-full px-4 lg:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" size="sm" asChild>
              <Link href={routes.articles()}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to articles
              </Link>
            </Button>

            <Button variant="outline" size="sm" asChild>
              <Link href={routes.article(article.id)}>
                <Eye className="h-4 w-4 mr-2" />
                View article
              </Link>
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Edit Article</CardTitle>
            </CardHeader>
            <CardContent>
              <Form
                article={article}
                onSubmit={(form: any) => {
                  form.transform((data: any) => ({ article: data }));
                  form.patch(routes.article(article.id));
                }}
                onSuccess={onSuccess}
                submitText="Update article"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
