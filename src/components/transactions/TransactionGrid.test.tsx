import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TransactionGrid from './TransactionGrid';
import { useAppStore } from '@/store';

describe('TransactionGrid', () => {
  beforeEach(() => {
    // Reset store
    const initial = useAppStore.getState();
    useAppStore.setState({
      ...initial,
      transactions: [
        {
          id: 't1',
          date: new Date().toISOString(),
          amount: -50,
          category: 'Groceries',
          description: 'Milk',
          tags: ['food'],
        },
      ],
    }, true);
    (window as any).__excelSaved = false;
  });

  it('exports to Excel when clicking the toolbar button', () => {
    render(<TransactionGrid />);
    const btn = screen.getByRole('button', { name: /Export to Excel/i });
    fireEvent.click(btn);
    expect((window as any).__excelSaved).toBe(true);
  });
});

