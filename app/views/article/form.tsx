import { useForm } from "@inertiajs/react";
import { Input } from "@ui/input";
import { Textarea } from "@ui/textarea";

export default function Form({ article, onSubmit, submitText }: any) {
  const form = useForm({
    title: article.title || "",
    body: article.body || "",
    author: article.author || "",
    published_at: article.published_at || "",
    status: article.status || "",
    featured: article.featured || false,
  });
  const { data, setData, errors, processing } = form;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="contents">
      <div className="my-5">
        <label htmlFor="title">Title</label>
        <Input
          type="text"
          name="title"
          id="title"
          value={data.title}
          className="block w-full px-3 py-2 mt-2 border border-gray-400 rounded-md shadow outline-none"
          onChange={(e) => setData("title", e.target.value)}
        />
        {errors.title && (
          <div className="px-3 py-2 font-medium text-red-500">
            {Array(errors.title).join(", ")}
          </div>
        )}
      </div>
      <div className="my-5">
        <label htmlFor="body">Body</label>
        <Textarea
          name="body"
          id="body"
          value={data.body}
          rows={4}
          className="block w-full px-3 py-2 mt-2 border border-gray-400 rounded-md shadow outline-none"
          onChange={(e) => setData("body", e.target.value)}
        />
        {errors.body && (
          <div className="px-3 py-2 font-medium text-red-500">
            {Array(errors.body).join(", ")}
          </div>
        )}
      </div>
      <div className="my-5">
        <label htmlFor="author">Author</label>
        <Input
          type="text"
          name="author"
          id="author"
          value={data.author}
          className="block w-full px-3 py-2 mt-2 border border-gray-400 rounded-md shadow outline-none"
          onChange={(e) => setData("author", e.target.value)}
        />
        {errors.author && (
          <div className="px-3 py-2 font-medium text-red-500">
            {Array(errors.author).join(", ")}
          </div>
        )}
      </div>
      <div className="my-5">
        <label htmlFor="published_at">Published at</label>
        <Input
          type="datetime-local"
          name="published_at"
          id="published_at"
          value={data.published_at}
          className="block w-full px-3 py-2 mt-2 border border-gray-400 rounded-md shadow outline-none"
          onChange={(e) => setData("published_at", e.target.value)}
        />
        {errors.published_at && (
          <div className="px-3 py-2 font-medium text-red-500">
            {Array(errors.published_at).join(", ")}
          </div>
        )}
      </div>
      <div className="my-5">
        <label htmlFor="status">Status</label>
        <Input
          type="text"
          name="status"
          id="status"
          value={data.status}
          className="block w-full px-3 py-2 mt-2 border border-gray-400 rounded-md shadow outline-none"
          onChange={(e) => setData("status", e.target.value)}
        />
        {errors.status && (
          <div className="px-3 py-2 font-medium text-red-500">
            {Array(errors.status).join(", ")}
          </div>
        )}
      </div>
      <div className="my-5">
        <label htmlFor="featured">Featured</label>
        <Input
          type="checkbox"
          name="featured"
          id="featured"
          checked={!!data.featured}
          className="block w-5 h-5 mt-2"
          onChange={(e) => setData("featured", e.target.checked)}
        />
        {errors.featured && (
          <div className="px-3 py-2 font-medium text-red-500">
            {Array(errors.featured).join(", ")}
          </div>
        )}
      </div>
      <div className="inline">
        <button
          type="submit"
          disabled={processing}
          className="inline-block px-5 py-3 font-medium text-white bg-blue-600 rounded-lg cursor-pointer"
        >
          {submitText}
        </button>
      </div>
    </form>
  );
}
