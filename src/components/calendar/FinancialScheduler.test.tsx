import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FinancialScheduler from './FinancialScheduler';
import { useAppStore } from '@/store';

describe('FinancialScheduler', () => {
  beforeEach(() => {
    const initial = useAppStore.getState();
    useAppStore.setState({
      ...initial,
      financialEvents: [],
      transactions: [],
    }, true);
  });

  it('handles create, update, and delete via Scheduler onDataChange', () => {
    render(<FinancialScheduler />);

    // Create
    (window as any).__schedulerCreated = {
      title: 'New Event',
      start: new Date().toISOString(),
      end: new Date().toISOString(),
      isAllDay: true,
    };
    fireEvent.click(screen.getByText('create'));
    expect(useAppStore.getState().financialEvents.length).toBe(1);

    const created = useAppStore.getState().financialEvents[0];

    // Update
    (window as any).__schedulerUpdated = { ...created, title: 'Updated Event' };
    fireEvent.click(screen.getByText('update'));
    expect(useAppStore.getState().financialEvents[0].title).toBe('Updated Event');

    // Delete
    (window as any).__schedulerDeleted = { id: created.id };
    fireEvent.click(screen.getByText('delete'));
    expect(useAppStore.getState().financialEvents.length).toBe(0);
  });
});

