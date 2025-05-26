import { Head } from "@inertiajs/react";
import Form from "./form";
import * as routes from "@src/routes";
import { SiteHeader } from "@/frontend/src/components/common/site-header";

export default function New({ article }: any) {
  return (
    <>
      <Head title="New Article" />
      <SiteHeader title="New Article" />

      <div className="w-full px-4 lg:px-6">
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
