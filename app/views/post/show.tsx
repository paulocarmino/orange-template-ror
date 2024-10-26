import { Link, Head } from "@inertiajs/react";
import Post from "./Post";
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

export default function Show({ post }: any) {
  const onDestroy = (e: any) => {
    if (!confirm("Are you sure you want to delete this post?")) {
      e.preventDefault();
    }
  };

  return (
    <>
      <Head title={`Post #${post.id}`} />

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
                <BreadcrumbPage>{`Post ${post.id}`}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="mt-2 w-2/3">
        <div className="mx-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold">{`Post ${post.id}`}</h1>
            <div className="flex gap-2">
              <Button asChild variant="default">
                <Link href={routes.edit_post(post.id)}>Edit</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link
                  href={routes.post(post.id)}
                  method="delete"
                  onClick={onDestroy}
                  as="button"
                >
                  Destroy this post
                </Link>
              </Button>
            </div>
          </div>
          <Post post={post} />
        </div>
      </div>
    </>
  );
}
