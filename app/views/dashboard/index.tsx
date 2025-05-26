import { SiteHeader } from "@/frontend/src/components/common/site-header";
import { ChartAreaInteractive } from "@/frontend/src/dashboard/chart-area-interactive";
import { DataTable } from "@/frontend/src/dashboard/data-table";
import { SectionCards } from "@/frontend/src/dashboard/section-cards";

export default function Index({ data }: any) {
  console.log(data);

  return (
    <>
      <SiteHeader title="Dashboard" />

      <SectionCards />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
      <DataTable data={data} />
    </>
  );
}
