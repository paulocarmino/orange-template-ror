export default function Article({ article }: any) {
  return (
    <div>
      <p className="my-5">
        <strong className="block mb-1 font-medium">Title:</strong>
        {article.title?.toString()}
      </p>
      <p className="my-5">
        <strong className="block mb-1 font-medium">Body:</strong>
        {article.body?.toString()}
      </p>
      <p className="my-5">
        <strong className="block mb-1 font-medium">Author:</strong>
        {article.author?.toString()}
      </p>
      <p className="my-5">
        <strong className="block mb-1 font-medium">Published at:</strong>
        {article.published_at?.toString()}
      </p>
      <p className="my-5">
        <strong className="block mb-1 font-medium">Status:</strong>
        {article.status?.toString()}
      </p>
      <p className="my-5">
        <strong className="block mb-1 font-medium">Featured:</strong>
        {article.featured?.toString()}
      </p>
    </div>
  )
}
