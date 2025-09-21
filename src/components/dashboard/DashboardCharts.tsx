"use client";

import { useState, useMemo, useEffect } from 'react';
import { Button } from '@progress/kendo-react-buttons';
import {
  Chart,
  ChartSeries,
  ChartSeriesItem,
  ChartTitle,
  ChartLegend,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartValueAxis,
  ChartValueAxisItem,
} from '@progress/kendo-react-charts';
import { DateRangePicker } from '@progress/kendo-react-dateinputs';
import { useAppStore } from '@/store';
import FinanceTasksCard from './FinanceTasksCard';
import { categoryLabel, normalizeCategory } from '@/lib/category-utils';
import TransactionDialog from '@/components/shared/TransactionDialog';

export interface Tx {
  date: string;
  amount: number;
  category: string;
  description: string;
  tags: string[];
}

const lineDateFormatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' });

const startOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());
const endOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);

const deriveInitialRange = (transactions: Tx[]): { start: Date | null; end: Date | null } => {
  const dates = (transactions || [])
    .map((t) => new Date(t.date))
    .filter((d) => !Number.isNaN(d.getTime()))
    .sort((a, b) => a.getTime() - b.getTime());

  if (dates.length === 0) {
    const end = new Date();
    const start = new Date(end);
    start.setDate(start.getDate() - 30);
    return { start: startOfDay(start), end: endOfDay(end) };
  }

  return {
    start: startOfDay(dates[0]),
    end: endOfDay(dates[dates.length - 1]),
  };
};

export const filterByDateRange = (transactions: Tx[], range: { start: Date | null; end: Date | null }) => {
  if (!transactions) return [] as Tx[];
  return transactions.filter((t) => {
    const transactionDate = new Date(t.date);
    return (!range.start || transactionDate >= range.start) && (!range.end || transactionDate <= range.end);
  });
};

export const computePieData = (transactions: Tx[]) => {
  const byCategory = (transactions || [])
    .filter((t) => t.amount < 0)
    .reduce((acc: Record<string, number>, t) => {
      const canonical = normalizeCategory(t.category);
      acc[canonical] = (acc[canonical] || 0) + Math.abs(t.amount);
      return acc;
    }, {} as Record<string, number>);

  return Object.keys(byCategory).map((canonical) => ({
    category: categoryLabel(canonical),
    value: byCategory[canonical],
  }));
};

export const computeLineData = (transactions: Tx[]) => {
  const dates = Array.from(new Set((transactions || []).map((t) => t.date.split('T')[0]))).sort();
  const labels = dates.map((date) => lineDateFormatter.format(new Date(`${date}T00:00:00Z`)));
  const income = dates.map((date) =>
    (transactions || [])
      .filter((t) => t.date.startsWith(date) && t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0)
  );
  const expense = dates.map((date) =>
    (transactions || [])
      .filter((t) => t.date.startsWith(date) && t.amount < 0)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0)
  );
  return { dates, labels, income, expense };
};

export const computeHeatmapData = (transactions: Tx[]) => {
  const counts = new Array(7).fill(null).map(() => new Array(24).fill(0));
  (transactions || [])
    .filter((t) => t.amount < 0)
    .forEach((t) => {
      const date = new Date(t.date);
      const day = date.getDay();
      const hour = date.getHours();
      if (counts[day] && typeof counts[day][hour] === 'number') {
        counts[day][hour] += 1;
      }
    });
  return counts.flatMap((row, dayIndex) =>
    row.map((value, hour) => ({
      x: weekdayLabels[dayIndex],
      y: hour,
      value,
    }))
  );
};

const weekdayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const DashboardCharts = () => {
  const transactions = useAppStore((state) => state.transactions) as Tx[];
  const financialEvents = useAppStore((state) => state.financialEvents);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dateRange, setDateRange] = useState<{ start: Date | null; end: Date | null }>(() => deriveInitialRange(transactions));

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('hammerjs').catch(() => {});
    }
  }, []);

  useEffect(() => {
    const derived = deriveInitialRange(transactions);
    const { start, end } = dateRange;
    const hasDataInRange =
      start && end
        ? transactions.some((t) => {
            const d = new Date(t.date);
            return d >= start && d <= end;
          })
        : false;

    if (!start || !end || !hasDataInRange) {
      setDateRange(derived);
    }
  }, [transactions, dateRange.start, dateRange.end]);

  const filteredTransactions = useMemo(
    () => filterByDateRange(transactions, dateRange),
    [transactions, dateRange]
  );

  const pieChartData = useMemo(() => computePieData(filteredTransactions), [filteredTransactions]);
  const lineChartData = useMemo(() => computeLineData(filteredTransactions), [filteredTransactions]);
  const heatmapData = useMemo(() => computeHeatmapData(filteredTransactions), [filteredTransactions]);

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <DateRangePicker
            value={dateRange}
            startDateInputSettings={{ label: 'Start Date', ariaLabel: 'Start Date' }}
            endDateInputSettings={{ label: 'End Date', ariaLabel: 'End Date' }}
            onChange={(e) => {
              if (e.value && e.value.start && e.value.end) {
                setDateRange(e.value);
              }
            }}
          />
          <Button themeColor="primary" onClick={() => setDialogOpen(true)}>
            Add Transaction
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Chart>
            <ChartTitle text="Expense by Category" />
            <ChartLegend position="bottom" />
            <ChartSeries>
              <ChartSeriesItem
                type="pie"
                data={pieChartData}
                field="value"
                categoryField="category"
                labels={{ visible: true, content: (e) => `${e.category}: ${e.value.toFixed(2)}` }}
              />
            </ChartSeries>
          </Chart>
          <Chart>
            <ChartTitle text="Income vs Expense" />
            <ChartLegend position="bottom" />
            <ChartCategoryAxis>
              <ChartCategoryAxisItem
                categories={lineChartData.labels}
                labels={{ rotation: 'auto', step: Math.max(1, Math.floor(lineChartData.labels.length / 6)) }}
              />
            </ChartCategoryAxis>
            <ChartSeries>
              <ChartSeriesItem type="line" data={lineChartData.income} name="Income" />
              <ChartSeriesItem type="line" data={lineChartData.expense} name="Expense" />
            </ChartSeries>
          </Chart>
          <FinanceTasksCard transactions={filteredTransactions} events={financialEvents} />
          <Chart>
            <ChartTitle text="Spending Heatmap" />
            <ChartCategoryAxis>
              <ChartCategoryAxisItem categories={weekdayLabels} />
            </ChartCategoryAxis>
            <ChartValueAxis>
              <ChartValueAxisItem labels={{ format: '{0}:00' }} />
            </ChartValueAxis>
            <ChartSeries>
              <ChartSeriesItem
                type="heatmap"
                data={heatmapData}
                field="value"
                xField="x"
                yField="y"
                color="#1D4ED8"
              />
            </ChartSeries>
          </Chart>
        </div>
      </div>
      {dialogOpen ? <TransactionDialog onClose={() => setDialogOpen(false)} /> : null}
    </>
  );
};

export default DashboardCharts;
