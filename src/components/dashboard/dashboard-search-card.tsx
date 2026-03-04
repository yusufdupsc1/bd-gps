import { Search } from "lucide-react";

interface DashboardSearchCardProps {
  isBangla: boolean;
}

export function DashboardSearchCard({ isBangla }: DashboardSearchCardProps) {
  return (
    <section className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
      <div className="mb-3 flex items-center gap-2 text-primary">
        <Search className="h-4 w-4" />
        <h2 className="text-base font-semibold">
          {isBangla ? "শিক্ষার্থী অনুসন্ধান" : "Student Search"}
        </h2>
      </div>
      <form action="/dashboard/students" method="get">
        <label htmlFor="dashboard-student-search" className="sr-only">
          {isBangla ? "শিক্ষার্থীর নাম লিখুন" : "Type student name"}
        </label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            id="dashboard-student-search"
            name="search"
            type="search"
            className="h-11 w-full rounded-xl border border-border bg-background pl-10 pr-3 text-sm outline-none transition-colors focus:border-primary/40 focus:ring-2 focus:ring-primary/10"
            placeholder={
              isBangla
                ? "শিক্ষার্থীর নাম বা আইডি খুঁজুন..."
                : "Search student by name or ID..."
            }
          />
        </div>
      </form>
    </section>
  );
}
