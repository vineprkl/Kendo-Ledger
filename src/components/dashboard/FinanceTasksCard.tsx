'use client';

import { Card, CardBody, CardHeader, CardTitle, CardSubtitle, CardFooter } from '@progress/kendo-react-layout';
import { Button, Chip } from '@progress/kendo-react-buttons';
import type { Tx } from './DashboardCharts';
import type { FinancialEvent } from '@/store';

interface FinanceTasksCardProps {
  transactions: Tx[];
  events: FinancialEvent[];
}

type TaskSeverity = 'high' | 'medium' | 'info';

interface TaskItem {
  id: string;
  title: string;
  subtitle: string;
  severity: TaskSeverity;
  hint: string;
}

// Note: Kendo Chip in this version does not support `appearance` prop.

const severityTheme: Record<TaskSeverity, 'info' | 'warning' | 'success' | 'error'> = {
  high: 'error',
  medium: 'warning',
  info: 'info',
};

const formatShortDate = (value: Date) =>
  new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(value);

const formatRelative = (value: Date) => {
  const now = new Date();
  const diff = value.getTime() - now.getTime();
  const dayMs = 24 * 60 * 60 * 1000;
  const days = Math.round(diff / dayMs);
  if (days === 0) {
    return 'today';
  }
  if (days === 1) {
    return 'tomorrow';
  }
  if (days === -1) {
    return 'yesterday';
  }
  return days > 0 ? `in ${days} days` : `${Math.abs(days)} days ago`;
};

const buildTasks = (transactions: Tx[], events: FinancialEvent[]): TaskItem[] => {
  const items: TaskItem[] = [];
  const now = new Date();
  const upcomingBoundary = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  (events || [])
    .map((event) => ({ ...event, startDate: new Date(event.start) }))
    .filter((event) => !Number.isNaN(event.startDate.getTime()))
    .filter((event) => event.startDate >= now && event.startDate <= upcomingBoundary)
    .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
    .slice(0, 3)
    .forEach((event) => {
      const subtitle = `${formatShortDate(event.startDate)} · ${formatRelative(event.startDate)}`;
      items.push({
        id: event.id,
        title: event.title,
        subtitle,
        severity: 'high',
        hint: 'Upcoming event',
      });
    });

  (transactions || [])
    .map((tx) => ({ ...tx, dateValue: new Date(tx.date) }))
    .filter((tx) => !Number.isNaN(tx.dateValue.getTime()))
    .filter((tx) => Math.abs(tx.amount) >= 400)
    .sort((a, b) => b.dateValue.getTime() - a.dateValue.getTime())
    .slice(0, 3)
    .forEach((tx) => {
      const amount = tx.amount >= 0 ? `+${tx.amount.toFixed(2)}` : `-${Math.abs(tx.amount).toFixed(2)}`;
      items.push({
        id: `tx-${tx.date}-${tx.amount}-${tx.category}`,
        title: tx.description || 'Recent activity',
        subtitle: `${formatShortDate(tx.dateValue)} · ${amount} · ${tx.category}`,
        severity: tx.amount < 0 ? 'medium' : 'info',
        hint: tx.amount < 0 ? 'Large expense' : 'Large income',
      });
    });

  return items;
};

const FinanceTasksCard = ({ transactions, events }: FinanceTasksCardProps) => {
  const tasks = buildTasks(transactions, events);
  const hasTasks = tasks.length > 0;

  return (
    <Card className="h-full shadow-sm border border-[var(--border-subtle)] bg-[var(--surface)]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-[var(--foreground)] text-lg">Finance Tasks</CardTitle>
            <CardSubtitle className="text-sm text-[var(--muted)]">Upcoming reminders & notable activity</CardSubtitle>
          </div>
          <Chip text={`${tasks.length}`} themeColor="info" size="small" />
        </div>
      </CardHeader>
      <CardBody>
        {hasTasks ? (
          <ul className="max-h-64 space-y-3 overflow-y-auto pr-1">
            {tasks.map((task) => (
              <li key={task.id} className="rounded-lg border border-[var(--border-subtle)] bg-white px-3 py-2 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[var(--foreground)]">{task.title}</p>
                    <p className="text-xs text-[var(--muted)]">{task.subtitle}</p>
                  </div>
                  <Chip text={task.hint} themeColor={severityTheme[task.severity]} size="small" />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-lg border border-dashed border-[var(--border-subtle)] bg-white px-4 py-6 text-center text-sm text-[var(--muted)]">
            All caught up! No urgent tasks right now.
          </div>
        )}
      </CardBody>
      <CardFooter className="flex justify-end">
        <Button
          size="small"
          themeColor="primary"
          onClick={() => {
            window.location.href = '/calendar';
          }}
        >
          View calendar
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FinanceTasksCard;


