import { useForm } from '@inertiajs/react';
import { Input } from '@ui/input';
import { Button } from '@ui/button';

export default function Form({ post, onSubmit, submitText }: any) {
  const form = useForm({
    title: post.title || '',
    description: post.description || '',
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
          type="input"
          name="title"
          id="title"
          value={data.title}
          className="block px-3 py-2 mt-2 w-full rounded-md border border-gray-400 shadow outline-none"
          onChange={(e) => setData("title", e.target.value)}
        />
        {errors.title && (
          <div className="px-3 py-2 font-medium text-red-500">
            {Array(errors.title).join(", ")}
          </div>
        )}
      </div>
      <div className="my-5">
        <label htmlFor="description">Description</label>
        <Input
          type="input"
          name="description"
          id="description"
          value={data.description}
          className="block px-3 py-2 mt-2 w-full rounded-md border border-gray-400 shadow outline-none"
          onChange={(e) => setData("description", e.target.value)}
        />
        {errors.description && (
          <div className="px-3 py-2 font-medium text-red-500">
            {Array(errors.description).join(", ")}
          </div>
        )}
      </div>
      <div className="inline">
        <Button type="submit" disabled={processing}>
          {submitText}
        </Button>
      </div>
    </form>
  );
}
