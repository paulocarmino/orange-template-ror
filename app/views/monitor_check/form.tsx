import { useForm } from '@inertiajs/react';

export default function Form({ monitor_check, onSubmit, submitText }: any) {
  const form = useForm({
    name: monitor_check.name || '',
    script: monitor_check.script || '',
    check_frequency: monitor_check.check_frequency || '',
    failure_count: monitor_check.failure_count || '',
    last_checked_at: monitor_check.last_checked_at || '',
  });
  const { data, setData, errors, processing } = form;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="contents">
      <div className="my-5">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={data.name}
          className="block shadow rounded-md border border-gray-400 outline-none px-3 py-2 mt-2 w-full"
          onChange={(e) => setData('name', e.target.value)}
        />
        {errors.name && (
          <div className="text-red-500 px-3 py-2 font-medium">
            {errors.name.join(', ')}
          </div>
        )}
      </div>
      <div className="my-5">
        <label htmlFor="script">Script</label>
        <textarea
          name="script"
          id="script"
          value={data.script}
          rows="4"
          className="block shadow rounded-md border border-gray-400 outline-none px-3 py-2 mt-2 w-full"
          onChange={(e) => setData('script', e.target.value)}
        />
        {errors.script && (
          <div className="text-red-500 px-3 py-2 font-medium">
            {errors.script.join(', ')}
          </div>
        )}
      </div>
      <div className="my-5">
        <label htmlFor="check_frequency">Check frequency</label>
        <input
          type="number"
          name="check_frequency"
          id="check_frequency"
          value={data.check_frequency}
          className="block shadow rounded-md border border-gray-400 outline-none px-3 py-2 mt-2 w-full"
          onChange={(e) => setData('check_frequency', e.target.value)}
        />
        {errors.check_frequency && (
          <div className="text-red-500 px-3 py-2 font-medium">
            {errors.check_frequency.join(', ')}
          </div>
        )}
      </div>
      <div className="my-5">
        <label htmlFor="failure_count">Failure count</label>
        <input
          type="number"
          name="failure_count"
          id="failure_count"
          value={data.failure_count}
          className="block shadow rounded-md border border-gray-400 outline-none px-3 py-2 mt-2 w-full"
          onChange={(e) => setData('failure_count', e.target.value)}
        />
        {errors.failure_count && (
          <div className="text-red-500 px-3 py-2 font-medium">
            {errors.failure_count.join(', ')}
          </div>
        )}
      </div>
      <div className="my-5">
        <label htmlFor="last_checked_at">Last checked at</label>
        <input
          type="datetime-local"
          name="last_checked_at"
          id="last_checked_at"
          value={data.last_checked_at}
          className="block shadow rounded-md border border-gray-400 outline-none px-3 py-2 mt-2 w-full"
          onChange={(e) => setData('last_checked_at', e.target.value)}
        />
        {errors.last_checked_at && (
          <div className="text-red-500 px-3 py-2 font-medium">
            {errors.last_checked_at.join(', ')}
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
