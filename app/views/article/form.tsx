import { useForm } from '@inertiajs/react';
import { Input } from "@ui/input";
import { Textarea } from "@ui/textarea";

export default function Form({ article, onSubmit, submitText }: any) {
  const form = useForm({
    title: article.title || '',
    body: article.body || '',
    author: article.author || '',
    published_at: article.published_at || '',
    status: article.status || '',
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
          className="block shadow rounded-md border border-gray-400 outline-none px-3 py-2 mt-2 w-full"
          onChange={(e) => setData('title', e.target.value)}
        />
        {errors.title && (
          <div className="text-red-500 px-3 py-2 font-medium">
            {Array(errors.title).join(', ')}
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
          className="block shadow rounded-md border border-gray-400 outline-none px-3 py-2 mt-2 w-full"
          onChange={(e) => setData('body', e.target.value)}
        />
        {errors.body && (
          <div className="text-red-500 px-3 py-2 font-medium">
            {Array(errors.body).join(', ')}
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
          className="block shadow rounded-md border border-gray-400 outline-none px-3 py-2 mt-2 w-full"
          onChange={(e) => setData('author', e.target.value)}
        />
        {errors.author && (
          <div className="text-red-500 px-3 py-2 font-medium">
            {Array(errors.author).join(', ')}
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
          className="block shadow rounded-md border border-gray-400 outline-none px-3 py-2 mt-2 w-full"
          onChange={(e) => setData('published_at', e.target.value)}
        />
        {errors.published_at && (
          <div className="text-red-500 px-3 py-2 font-medium">
            {Array(errors.published_at).join(', ')}
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
          className="block shadow rounded-md border border-gray-400 outline-none px-3 py-2 mt-2 w-full"
          onChange={(e) => setData('status', e.target.value)}
        />
        {errors.status && (
          <div className="text-red-500 px-3 py-2 font-medium">
            {Array(errors.status).join(', ')}
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
          className="block mt-2 h-5 w-5"
          onChange={(e) => setData('featured', e.target.checked)}
        />
        {errors.featured && (
          <div className="text-red-500 px-3 py-2 font-medium">
            {Array(errors.featured).join(', ')}
          </div>
        )}
      </div>
      <div className="inline">
        <button
          type="submit"
          disabled={processing}
          className="rounded-lg py-3 px-5 bg-blue-600 text-white inline-block font-medium cursor-pointer"
        >
          {submitText}
        </button>
      </div>
    </form>
  );
}
