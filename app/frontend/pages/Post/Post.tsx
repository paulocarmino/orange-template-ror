export default function Post({ post }) {
  return (
    <div>
      <p className="my-5">
        <strong className="block font-medium mb-1">Title:</strong>
        {post.title?.toString()}
      </p>
      <p className="my-5">
        <strong className="block font-medium mb-1">Description:</strong>
        {post.description?.toString()}
      </p>
    </div>
  )
}
