import { useForm } from '@inertiajs/react'

export default function Form({ post, onSubmit, submitText }) {
  const form = useForm({
    title: post.title || '',
    description: post.description || '',
  })
  const { data, setData, errors, processing } = form

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} className="contents">
      <div className="my-5">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={data.title}
          className="block shadow rounded-md border border-gray-400 outline-none px-3 py-2 mt-2 w-full"
          onChange={(e) => setData('title', e.target.value)}
        />
        {errors.title && (
          <div className="text-red-500 px-3 py-2 font-medium">
            {errors.title.join(', ')}
          </div>
        )}
      </div>

      <div className="my-5">
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          id="description"
          value={data.description}
          className="block shadow rounded-md border border-gray-400 outline-none px-3 py-2 mt-2 w-full"
          onChange={(e) => setData('description', e.target.value)}
        />
        {errors.description && (
          <div className="text-red-500 px-3 py-2 font-medium">
            {errors.description.join(', ')}
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
  )
}
