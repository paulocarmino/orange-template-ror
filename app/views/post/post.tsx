export default function Post({ post }: any) {
  return (
    <div>
      <p>
        <strong>Title:</strong>
        {post.title.toString()}
      </p>
      <p>
        <strong>Description:</strong>
        {post.description.toString()}
      </p>
    </div>
  );
}
