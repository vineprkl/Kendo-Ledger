import { computePieData, computeLineData, computeWaterfallData, computeHeatmapData, filterByDateRange, type Tx } from './DashboardCharts';

const tx = (date: string, amount: number, category = 'C', description = '', tags: string[] = []): Tx => ({ id: undefined as any, date, amount, category, description, tags } as any);

describe('DashboardCharts data helpers', () => {
  const d = (y: number, m: number, day: number, hour = 0) => new Date(y, m - 1, day, hour).toISOString();

  const transactions: Tx[] = [
    tx(d(2024, 1, 1, 9), 100, 'Income'),
    tx(d(2024, 1, 1, 10), -20, 'Food'),
    tx(d(2024, 1, 2, 12), -30, 'Transport'),
    tx(d(2024, 1, 2, 13), 50, 'Income'),
  ];

  it('filters by date range', () => {
    const range = { start: new Date(2024, 0, 2), end: new Date(2024, 0, 2, 23, 59) };
    const result = filterByDateRange(transactions, range);
    expect(result.length).toBe(2);
  });

  it('computes pie data from expenses', () => {
    const pie = computePieData(transactions);
    const labels = pie.map(p => p.category).sort();
    expect(labels).toEqual(['Food & Dining', 'Transport']);
    expect(line.labels).toEqual(['Jan 1', 'Jan 2']);
    const total = pie.reduce((s, p) => s + p.value, 0);
    expect(total).toBe(50);
  });

  it('computes line data by day with correct date keys', () => {
    const line = computeLineData(transactions);
    expect(line.dates).toEqual([transactions[0].date.split('T')[0], transactions[2].date.split('T')[0]]);
    expect(line.labels).toEqual(['Jan 1', 'Jan 2']);
    expect(line.income).toEqual([100, 50]);
    expect(line.expense).toEqual([20, 30]);
  });

  it('computes waterfall totals', () => {
    const wf = computeWaterfallData(transactions);
    const income = wf.find(i => i.summary === 'running' && i.value! >= 0)!.value as number;
    const expense = wf.find(i => i.summary === 'running' && i.value! < 0)!.value as number;
    expect(income).toBe(150);
    expect(expense).toBe(-50);
  });

  it('computes heatmap frequencies for expenses', () => {
    const heat = computeHeatmapData(transactions);
    const total = heat.reduce((sum, point) => sum + point.value, 0);
    expect(total).toBe(2);
    const mondayTen = heat.find((point) => point.x === 'Mon' && point.y === 10);
    expect(mondayTen?.value).toBe(1);
  });
});

