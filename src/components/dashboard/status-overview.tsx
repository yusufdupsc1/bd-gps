import {
  BookOpenCheck,
  CircleCheckBig,
  CircleOff,
  GraduationCap,
  TrendingDown,
  TrendingUp,
  UserCheck,
  UserRoundCog,
  Users,
  UserX,
} from "lucide-react";
import { convertToBanglaDigits } from "@/lib/bangla-digits";

interface DashboardOverviewData {
  students: {
    total: number;
    active: number;
    inactive: number;
    graduated: number;
    transferred: number;
  };
  teachers: {
    total: number;
    active: number;
    onLeave: number;
    inactive: number;
    resigned: number;
  };
  classes: {
    total: number;
    spotlight: Array<{
      id: string;
      name: string;
      count: number;
      percentage: number;
    }>;
    strongest: {
      name: string;
      percentage: number;
    } | null;
    needsSupport: {
      name: string;
      percentage: number;
    } | null;
  };
}

interface StatusOverviewProps {
  data: DashboardOverviewData;
  isBangla: boolean;
}

function n(value: number, isBangla: boolean) {
  return isBangla ? convertToBanglaDigits(value) : String(value);
}

function p(value: number, isBangla: boolean) {
  const text = `${Math.max(0, Math.round(value))}%`;
  return isBangla ? convertToBanglaDigits(text) : text;
}

export function StatusOverview({ data, isBangla }: StatusOverviewProps) {
  return (
    <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <article className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
        <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold">
          <Users className="h-5 w-5 text-primary" />
          {isBangla ? "শিক্ষার্থী অবস্থা" : "Student Status"}
        </h3>
        <p className="text-4xl font-bold leading-none">
          {n(data.students.total, isBangla)}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          {isBangla ? "মোট শিক্ষার্থী" : "Total students"}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
          <div className="rounded-xl border border-border bg-muted/20 p-2.5">
            <p className="flex items-center gap-1.5 text-muted-foreground">
              <UserCheck className="h-4 w-4 text-emerald-600" />
              {isBangla ? "সক্রিয়" : "Active"}
            </p>
            <p className="mt-1 font-semibold">{n(data.students.active, isBangla)}</p>
          </div>
          <div className="rounded-xl border border-border bg-muted/20 p-2.5">
            <p className="flex items-center gap-1.5 text-muted-foreground">
              <UserX className="h-4 w-4 text-slate-500" />
              {isBangla ? "নিষ্ক্রিয়" : "Inactive"}
            </p>
            <p className="mt-1 font-semibold">
              {n(data.students.inactive, isBangla)}
            </p>
          </div>
          <div className="rounded-xl border border-border bg-muted/20 p-2.5">
            <p className="flex items-center gap-1.5 text-muted-foreground">
              <GraduationCap className="h-4 w-4 text-blue-600" />
              {isBangla ? "স্নাতক" : "Graduated"}
            </p>
            <p className="mt-1 font-semibold">
              {n(data.students.graduated, isBangla)}
            </p>
          </div>
          <div className="rounded-xl border border-border bg-muted/20 p-2.5">
            <p className="flex items-center gap-1.5 text-muted-foreground">
              <CircleOff className="h-4 w-4 text-violet-600" />
              {isBangla ? "স্থানান্তর" : "Transferred"}
            </p>
            <p className="mt-1 font-semibold">
              {n(data.students.transferred, isBangla)}
            </p>
          </div>
        </div>
      </article>

      <article className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
        <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold">
          <BookOpenCheck className="h-5 w-5 text-primary" />
          {isBangla ? "শিক্ষক অবস্থা" : "Teacher Status"}
        </h3>
        <p className="text-4xl font-bold leading-none">
          {n(data.teachers.total, isBangla)}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          {isBangla ? "মোট শিক্ষক" : "Total teachers"}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
          <div className="rounded-xl border border-border bg-muted/20 p-2.5">
            <p className="flex items-center gap-1.5 text-muted-foreground">
              <UserCheck className="h-4 w-4 text-emerald-600" />
              {isBangla ? "সক্রিয়" : "Active"}
            </p>
            <p className="mt-1 font-semibold">{n(data.teachers.active, isBangla)}</p>
          </div>
          <div className="rounded-xl border border-border bg-muted/20 p-2.5">
            <p className="flex items-center gap-1.5 text-muted-foreground">
              <UserRoundCog className="h-4 w-4 text-amber-600" />
              {isBangla ? "ছুটিতে" : "On leave"}
            </p>
            <p className="mt-1 font-semibold">
              {n(data.teachers.onLeave, isBangla)}
            </p>
          </div>
          <div className="rounded-xl border border-border bg-muted/20 p-2.5">
            <p className="flex items-center gap-1.5 text-muted-foreground">
              <UserX className="h-4 w-4 text-slate-500" />
              {isBangla ? "নিষ্ক্রিয়" : "Inactive"}
            </p>
            <p className="mt-1 font-semibold">
              {n(data.teachers.inactive, isBangla)}
            </p>
          </div>
          <div className="rounded-xl border border-border bg-muted/20 p-2.5">
            <p className="flex items-center gap-1.5 text-muted-foreground">
              <CircleOff className="h-4 w-4 text-red-600" />
              {isBangla ? "পদত্যাগ" : "Resigned"}
            </p>
            <p className="mt-1 font-semibold">
              {n(data.teachers.resigned, isBangla)}
            </p>
          </div>
        </div>
      </article>

      <article className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
        <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold">
          <GraduationCap className="h-5 w-5 text-primary" />
          {isBangla ? "শ্রেণিভিত্তিক অবস্থা" : "Class Trends"}
        </h3>
        <p className="text-sm text-muted-foreground">
          {isBangla ? "সক্রিয় শ্রেণি" : "Active classes"}:{" "}
          <span className="font-semibold text-foreground">
            {n(data.classes.total, isBangla)}
          </span>
        </p>

        <div className="mt-4 grid grid-cols-1 gap-2">
          {data.classes.spotlight.length ? (
            data.classes.spotlight.map((cls) => (
              <div
                key={cls.id}
                className="rounded-xl border border-border bg-muted/20 px-3 py-2.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-semibold">{cls.name}</p>
                  <p className="text-xs font-semibold text-primary">
                    {p(cls.percentage, isBangla)}
                  </p>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {isBangla ? "শিক্ষার্থী" : "Students"}:{" "}
                  {n(cls.count, isBangla)}
                </p>
              </div>
            ))
          ) : (
            <div className="rounded-xl border border-dashed border-border bg-muted/10 px-3 py-6 text-center text-sm text-muted-foreground">
              {isBangla ? "এখনও কোনো শ্রেণির তথ্য নেই" : "No class data yet"}
            </div>
          )}
        </div>

        <div className="mt-4 space-y-2 text-sm">
          <div className="flex items-center justify-between rounded-lg border border-border px-2.5 py-2">
            <p className="flex items-center gap-1.5 text-muted-foreground">
              <TrendingUp className="h-4 w-4 text-emerald-600" />
              {isBangla ? "সেরা শ্রেণি" : "Strongest class"}
            </p>
            <p className="font-semibold">
              {data.classes.strongest
                ? `${data.classes.strongest.name} (${p(data.classes.strongest.percentage, isBangla)})`
                : isBangla
                  ? "—"
                  : "—"}
            </p>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border px-2.5 py-2">
            <p className="flex items-center gap-1.5 text-muted-foreground">
              <TrendingDown className="h-4 w-4 text-amber-600" />
              {isBangla ? "মনোযোগ দরকার" : "Needs support"}
            </p>
            <p className="font-semibold">
              {data.classes.needsSupport
                ? `${data.classes.needsSupport.name} (${p(data.classes.needsSupport.percentage, isBangla)})`
                : isBangla
                  ? "—"
                  : "—"}
            </p>
          </div>
        </div>

        {data.classes.total > 0 ? (
          <p className="mt-3 flex items-center gap-1.5 text-xs text-emerald-700">
            <CircleCheckBig className="h-3.5 w-3.5" />
            {isBangla
              ? "শ্রেণির অবস্থা সফলভাবে আপডেট হয়েছে"
              : "Class trend data updated"}
          </p>
        ) : null}
      </article>
    </section>
  );
}
