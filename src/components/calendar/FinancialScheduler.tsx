'use client';

import { Button } from '@progress/kendo-react-buttons';
import { Scheduler } from '@progress/kendo-react-scheduler';
import { useAppStore, type Transaction, type FinancialEvent } from '@/store';

const ONE_HOUR = 60 * 60 * 1000;

const FinancialScheduler = () => {
  const {
    transactions,
    financialEvents,
    addFinancialEvent,
    updateFinancialEvent,
    deleteFinancialEvent,
    addNotification,
  } = useAppStore();

  const handleQuickAdd = () => {
    const start = new Date();
    const end = new Date(start.getTime() + ONE_HOUR);

    addFinancialEvent({
      title: 'New reminder',
      start: start.toISOString(),
      end: end.toISOString(),
      isAllDay: false,
    });
    addNotification({ message: 'Event added to calendar', type: 'success' });
  };

  const schedulerData = [
    ...(transactions as Transaction[]).map((t) => {
      const start = new Date(t.date);
      const end = new Date(start.getTime() + ONE_HOUR);
      const description = t.description || 'Transaction';

      return {
        id: t.id,
        start,
        end,
        title: description,
        text: description,
        isAllDay: false,
      };
    }),
    ...(financialEvents as FinancialEvent[]).map((event) => ({
      id: event.id,
      start: new Date(event.start),
      end: new Date(event.end),
      title: event.title,
      text: event.title,
      isAllDay: event.isAllDay,
      recurrenceRule: event.recurrenceRule,
    })),
  ];

  const handleDataChange = (e: any) => {
    if (e.created) {
      addFinancialEvent(e.created);
    }
    if (e.updated) {
      updateFinancialEvent(e.updated);
    }
    if (e.deleted) {
      deleteFinancialEvent(e.deleted.id);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-[var(--foreground)]">Financial Calendar</h1>
        <Button themeColor="primary" onClick={handleQuickAdd}>
          Add Quick Event
        </Button>
      </div>
      <Scheduler data={schedulerData} onDataChange={handleDataChange} />
    </div>
  );
};

export default FinancialScheduler;
