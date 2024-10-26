import { Link, Head } from "@inertiajs/react";
import Form from "./form";

export default function New({ post }: any) {
  return (
    <>
      <Head title="New post" />

      <h1>New post</h1>

      <Form
        post={post}
        onSubmit={(form: any) => {
          form.transform((data: any) => ({ post: data }));
          form.post("/posts");
        }}
        submitText="Create post"
      />

      <br />

      <div>
        <Link href="/posts">Back to posts</Link>
      </div>
    </>
  );
}
