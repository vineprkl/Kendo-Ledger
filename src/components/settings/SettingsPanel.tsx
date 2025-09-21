'use client';

import { useRef, useState, type ChangeEvent } from 'react';
import { useAppStore } from '@/store';

const SettingsPanel = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const resetApp = useAppStore((state) => state.resetApp);
  const clearAll = useAppStore((state) => state.clearAll);

  const handleExport = () => {
    const { transactions, categories, tags, financialEvents, preferences, notifications } = useAppStore.getState();
    const payload = {
      transactions,
      categories,
      tags,
      financialEvents,
      preferences,
      notifications,
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ledger-settings-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setStatus('Export completed. Check your downloads folder.');
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImportChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      const { transactions, categories, tags, financialEvents, preferences, notifications } = parsed ?? {};

      useAppStore.setState((state) => ({
        ...state,
        transactions: Array.isArray(transactions) ? transactions : state.transactions,
        categories: Array.isArray(categories) ? categories : state.categories,
        tags: Array.isArray(tags) ? tags : state.tags,
        financialEvents: Array.isArray(financialEvents) ? financialEvents : state.financialEvents,
        notifications: Array.isArray(notifications) ? notifications : state.notifications,
        preferences:
          preferences && typeof preferences === 'object'
            ? { ...state.preferences, ...preferences }
            : state.preferences,
      }));

      setStatus('Import successful. Data has been merged.');
    } catch (error) {
      console.error(error);
      setStatus('Import failed. Please check the file format.');
    } finally {
      if (event.target) {
        event.target.value = '';
      }
    }
  };


  const handleClearAll = () => {
    const confirmed =
      typeof window === 'undefined'
        ? true
        : window.confirm('This will remove all transactions, events, and notifications. Continue?');

    if (!confirmed) {
      return;
    }

    clearAll();
    setStatus('All data cleared.');
  };

  const handleReset = () => {
    const confirmed =
      typeof window === 'undefined'
        ? true
        : window.confirm('This restores the sample dataset and removes your current bookkeeping records. Continue?');

    if (!confirmed) {
      return;
    }

    resetApp();
    setStatus('Sample data restored.');
  };

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)] p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-[var(--foreground)]">Settings</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">Export, import, or reset your bookkeeping data.</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[var(--accent-hover)]"
            onClick={handleExport}
          >
            Export Data
          </button>
          <button
            type="button"
            className="rounded-lg border border-[var(--border-subtle)] px-4 py-2 text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
            onClick={handleImportClick}
          >
            Import Data
          </button>
          <button
            type="button"
            className="rounded-lg border border-red-200/60 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 shadow-sm transition-colors hover:bg-red-100"
            onClick={handleReset}
          >
            Reset to Sample Data
          </button>
          <button
            type="button"
            className="rounded-lg border border-[var(--border-subtle)] px-4 py-2 text-sm font-medium text-red-500 transition-colors hover:text-red-600"
            onClick={handleClearAll}
          >
            Clear All Data
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={handleImportChange}
          />
        </div>
        <p className="mt-3 text-xs text-[var(--muted)]">
          Import accepts a JSON file previously exported from Ledger Pro.
        </p>
      </div>

      {status ? (
        <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] p-4 text-sm text-[var(--foreground)]">
          {status}
        </div>
      ) : null}
    </section>
  );
};

export default SettingsPanel;
