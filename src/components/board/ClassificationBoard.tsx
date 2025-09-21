'use client';

import { Sortable, SortableItemUIProps } from '@progress/kendo-react-sortable';
import { useMemo } from 'react';
import { useAppStore, type Transaction } from '@/store';
import { DEFAULT_CATEGORIES, categoryLabel, normalizeCategory } from '@/lib/category-utils';

const ClassificationBoard = () => {
  const { transactions, categories, updateTransaction } = useAppStore();

  const handleDrop = (item: Transaction, newCategory: string) => {
    const targetCategory = normalizeCategory(newCategory);
    updateTransaction({ ...item, category: targetCategory });
  };

  const canonicalCategories = useMemo(() => {
    const seen = new Set<string>();
    const ordered: string[] = [];

    const add = (name?: string) => {
      if (!name) {
        return;
      }

      const normalized = normalizeCategory(name);
      if (!normalized || seen.has(normalized)) {
        return;
      }

      seen.add(normalized);
      ordered.push(normalized);
    };

    categories.forEach(add);
    transactions.forEach((tx) => add(tx.category));

    if (ordered.length === 0) {
      DEFAULT_CATEGORIES.forEach(add);
    }

    return ordered;
  }, [categories, transactions]);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4 text-[var(--foreground)]">Classification Board</h1>
      <div className="grid grid-cols-4 gap-4">
        {canonicalCategories.map((category) => {
          const label = categoryLabel(category);
          const items = transactions.filter((t) => normalizeCategory(t.category) === category);
          const testId = `sortable-${encodeURIComponent(category)}`;

          return (
            <div key={category} className="rounded-lg bg-[var(--surface)] p-4 shadow-sm">
              <h2 className="mb-2 font-semibold text-[var(--foreground)]">{label}</h2>
              <div data-testid={testId} className="space-y-2">
                <Sortable
                  idField="id"
                  data={items}
                  itemUI={(props: SortableItemUIProps) => (
                    <div className="rounded border border-[var(--border-subtle)] bg-white p-2 text-sm text-[var(--foreground)] shadow">
                      {props.dataItem.description}
                    </div>
                  )}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ClassificationBoard;
