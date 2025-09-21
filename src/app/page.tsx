'use client';

import DashboardCharts from '@/components/dashboard/DashboardCharts';

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-[var(--foreground)]">Dashboard</h1>
      <DashboardCharts />
    </div>
  );
}
