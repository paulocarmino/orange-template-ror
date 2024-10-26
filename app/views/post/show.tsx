import { Link, Head } from "@inertiajs/react";
import Post from "./post";

export default function Show({ post, flash }: any) {
  const onDestroy = (e: any) => {
    if (!confirm("Are you sure you want to delete this post?")) {
      e.preventDefault();
    }
  };

  return (
    <>
      <Head title={`Post #${post.id}`} />

      {flash.notice && <p style={{ color: "green" }}>{flash.notice}</p>}

      <h1>Post #{post.id}</h1>

      <Post post={post} />

      <div>
        <Link href={`/posts/${post.id}/edit`}>Edit this post</Link>
        {" | "}
        <Link href="/posts">Back to posts</Link>

        <br />

        <Link
          href={`/posts/${post.id}`}
          onClick={onDestroy}
          as="button"
          method="delete"
        >
          Destroy this post
        </Link>
      </div>
    </>
  );
}
