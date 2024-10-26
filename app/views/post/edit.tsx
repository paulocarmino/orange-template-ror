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

export default function Edit({ post }: any) {
  return (
    <>
      <Head title={`Editing post`} />

      <header className="flex gap-2 items-center pt-8 shrink-0">
        <div className="flex gap-2 items-center">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={routes.posts()}>Posts</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{post.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="mt-2 w-2/3">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">Editing post</h1>

          <Button variant="outline" className="ml-3" asChild>
            <Link href={routes.post(post.id)}>
              Show this post
            </Link>
          </Button>
        </div>

        <Form
          post={post}
          onSubmit={(form: any) => {
            form.transform((data: any) => ({ post: data }));
            form.patch(routes.post(post.id));
          }}
          submitText={`Update post`}
        />
      </div>
    </>
  );
}
