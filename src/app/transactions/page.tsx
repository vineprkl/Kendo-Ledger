'use client';

import { useState } from 'react';
import { Button } from '@progress/kendo-react-buttons';
import TransactionGrid from '@/components/transactions/TransactionGrid';
import TransactionDialog from '@/components/shared/TransactionDialog';

const TransactionsPage = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl font-bold text-[var(--foreground)]">Transactions</h1>
          <Button themeColor="primary" onClick={() => setDialogOpen(true)}>
            Add Transaction
          </Button>
        </div>
        <TransactionGrid />
      </div>
      {dialogOpen ? <TransactionDialog onClose={() => setDialogOpen(false)} /> : null}
    </>
  );
};

export default TransactionsPage;
