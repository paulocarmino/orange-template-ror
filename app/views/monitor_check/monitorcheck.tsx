export default function MonitorCheck({ monitor_check }: any) {
  return (
    <div>
      <p className="my-5">
        <strong className="block mb-1 font-medium">Name:</strong>
        {monitor_check.name?.toString()}
      </p>
      <p className="my-5">
        <strong className="block mb-1 font-medium">Script:</strong>
        {monitor_check.script?.toString()}
      </p>
      <p className="my-5">
        <strong className="block mb-1 font-medium">Check frequency:</strong>
        {monitor_check.check_frequency?.toString()}
      </p>
      <p className="my-5">
        <strong className="block mb-1 font-medium">Failure count:</strong>
        {monitor_check.failure_count?.toString()}
      </p>
      <p className="my-5">
        <strong className="block mb-1 font-medium">Last checked at:</strong>
        {monitor_check.last_checked_at?.toString()}
      </p>
    </div>
  )
}
