import { Button } from "@ui/button";
import { useForm } from "@inertiajs/react";
import { Input } from "@ui/input";
import { Label } from "@ui/label";
import { Textarea } from "@ui/textarea";
import { Checkbox } from "@ui/checkbox";

interface FormProps {
  article: any;
  onSubmit: (form: any) => void;
  onSuccess?: () => void;
  submitText: string;
}

export default function Form({ article, onSubmit, onSuccess, submitText }: FormProps) {
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

    // AIDEV-NOTE: Wrap form methods to inject onSuccess callback
    const formWithCallback = {
      ...form,
      post: (url: string, options = {}) => {
        return form.post(url, {
          ...options,
          onSuccess: () => {
            if (onSuccess) onSuccess();
          }
        });
      },
      patch: (url: string, options = {}) => {
        return form.patch(url, {
          ...options,
          onSuccess: () => {
            if (onSuccess) onSuccess();
          }
        });
      }
    };

    onSubmit(formWithCallback);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          name="title"
          id="title"
          value={data.title}
          onChange={(e) => setData("title", e.target.value)}
        />
        {errors.title && (
          <p className="text-sm font-medium text-destructive">
            {(errors.title as string[]).join(", ")}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="body">Body</Label>
        <Textarea
          name="body"
          id="body"
          value={data.body}
          rows={6}
          onChange={(e) => setData("body", e.target.value)}
        />
        {errors.body && (
          <p className="text-sm font-medium text-destructive">
            {(errors.body as string[]).join(", ")}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="author">Author</Label>
        <Input
          type="text"
          name="author"
          id="author"
          value={data.author}
          onChange={(e) => setData("author", e.target.value)}
        />
        {errors.author && (
          <p className="text-sm font-medium text-destructive">
            {(errors.author as string[]).join(", ")}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="published_at">Published at</Label>
        <Input
          type="datetime-local"
          name="published_at"
          id="published_at"
          value={data.published_at}
          onChange={(e) => setData("published_at", e.target.value)}
        />
        {errors.published_at && (
          <p className="text-sm font-medium text-destructive">
            {(errors.published_at as string[]).join(", ")}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Input
          type="text"
          name="status"
          id="status"
          value={data.status}
          onChange={(e) => setData("status", e.target.value)}
        />
        {errors.status && (
          <p className="text-sm font-medium text-destructive">
            {(errors.status as string[]).join(", ")}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="featured"
            checked={!!data.featured}
            onCheckedChange={(checked) => setData("featured", checked)}
          />
          <Label htmlFor="featured" className="font-normal cursor-pointer">
            Featured article
          </Label>
        </div>
        {errors.featured && (
          <p className="text-sm font-medium text-destructive">
            {(errors.featured as string[]).join(", ")}
          </p>
        )}
      </div>

      <div className="flex justify-end pt-4">
        <Button type="submit" disabled={processing}>
          {submitText}
        </Button>
      </div>
    </form>
  );
}
