import { Link, Head } from "@inertiajs/react";
import Form from "./form";

export default function Edit({ post }: any) {
  return (
    <>
      <Head title="Editing post" />

      <h1>Editing post</h1>

      <Form
        post={post}
        onSubmit={(form) => {
          form.transform((data) => ({ post: data }));
          form.patch(`/posts/${post.id}`);
        }}
        submitText="Update post"
      />

      <br />

      <div>
        <Link href={`/posts/${post.id}`}>Show this post</Link>
        {" | "}
        <Link href="/posts">Back to posts</Link>
      </div>
    </>
  );
}
