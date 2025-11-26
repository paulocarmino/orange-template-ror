import { Link, Head } from "@inertiajs/react";
import Form from "./form";
import * as routes from "@src/routes";
import { SiteHeader } from "@/frontend/src/components/common/site-header";
import { Button } from "@ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";
import { ArrowLeft } from "lucide-react";

interface NewProps {
  article: any;
  isModal?: boolean;
  onSuccess?: () => void;
}

export default function New({ article, isModal = false, onSuccess }: NewProps) {
  if (isModal) {
    return (
      <Form
        article={article}
        onSubmit={(form: any) => {
          form.transform((data: any) => ({ article: data }));
          form.post(routes.articles());
        }}
        onSuccess={onSuccess}
        submitText="Create article"
      />
    );
  }

  return (
    <>
      <Head title="New Article" />
      <SiteHeader title="New Article" />

      <div className="w-full px-4 lg:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" size="sm" asChild>
              <Link href={routes.articles()}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to articles
              </Link>
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Create New Article</CardTitle>
            </CardHeader>
            <CardContent>
              <Form
                article={article}
                onSubmit={(form: any) => {
                  form.transform((data: any) => ({ article: data }));
                  form.post(routes.articles());
                }}
                onSuccess={onSuccess}
                submitText="Create article"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
