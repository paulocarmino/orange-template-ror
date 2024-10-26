import { useForm } from "@inertiajs/react";

export default function Form({ post, onSubmit, submitText }: any) {
  const form = useForm({
    title: post.title || "",
    description: post.description || "",
  });
  const { data, setData, errors, processing } = form;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label style={{ display: "block" }} htmlFor="title">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={data.title}
          onChange={(e) => setData("title", e.target.value)}
        />
        {errors.title && (
          <div className="px-3 py-2 font-medium text-red-500">
            {Array(errors.title).join(", ")}
          </div>
        )}
      </div>
      <div>
        <label style={{ display: "block" }} htmlFor="description">
          Description
        </label>
        <input
          type="text"
          name="description"
          id="description"
          value={data.description}
          onChange={(e) => setData("description", e.target.value)}
        />
        {errors.description && (
          <div className="px-3 py-2 font-medium text-red-500">
            {Array(errors.description).join(", ")}
          </div>
        )}
      </div>
      <div>
        <button type="submit" disabled={processing}>
          {submitText}
        </button>
      </div>
    </form>
  );
}
