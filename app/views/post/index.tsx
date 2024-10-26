import { Link, Head } from "@inertiajs/react";
import Post from "./post";

export default function Index({ posts, flash }: any) {
  return (
    <>
      <Head title="Posts" />

      {flash.notice && <p style={{ color: "green" }}>{flash.notice}</p>}

      <h1>Posts</h1>
      <div>
        {posts.map((post: any) => (
          <div key={post.id}>
            <Post post={post} />
            <p>
              <Link href={`/posts/${post.id}`}>Show this post</Link>
            </p>
          </div>
        ))}
      </div>

      <Link href="/posts/new">New post</Link>
    </>
  );
}
