'use client';

import { useState } from 'react';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { Editor } from '@progress/kendo-react-editor';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { MultiSelect } from '@progress/kendo-react-dropdowns';
import { NumericTextBox } from '@progress/kendo-react-inputs';
import { useAppStore, Transaction } from '@/store';

interface TransactionDialogProps {
  onClose: () => void;
  transaction?: Transaction | null;
}

const TransactionDialog = ({ onClose, transaction }: TransactionDialogProps) => {
  const { categories, tags, addTransaction, updateTransaction, addNotification } = useAppStore();
  const [formState, setFormState] = useState({
    date: transaction?.date || new Date().toISOString(),
    amount: transaction?.amount || 0,
    category: transaction?.category || (categories[0] ?? ''),
    description: transaction?.description || '',
    tags: transaction?.tags || [],
  });

  const handleChange = (field: string, value: any) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (transaction) {
      updateTransaction({ ...formState, id: transaction.id });
    } else {
      addTransaction(formState);
    }
    addNotification({ message: 'Transaction saved', type: 'success' });
    onClose();
  };

  return (
    <Dialog title="Transaction Details" onClose={onClose}>
      <form className="k-form">
        <fieldset>
          <div className="mb-3">
            <label className="k-label">Category</label>
            <DropDownList
              data={categories}
              value={formState.category}
              onChange={(e: any) => handleChange('category', e.value ?? e.target?.value)}
            />
          </div>
          <div className="mb-3">
            <label className="k-label">Amount</label>
            <NumericTextBox
              value={formState.amount}
              onChange={(e: any) => {
                const raw = e?.value ?? e?.target?.value ?? 0;
                const num = typeof raw === 'number' ? raw : parseFloat(raw || '0');
                handleChange('amount', Number.isNaN(num) ? 0 : num);
              }}
            />
          </div>
          <div className="mb-3">
            <label className="k-label">Tags</label>
            <MultiSelect
              data={tags}
              value={formState.tags}
              onChange={(e: any) => handleChange('tags', e.value ?? e.target?.value ?? [])}
            />
          </div>
          <div className="mb-3">
            <label className="k-label">Description</label>
            <Editor
              value={formState.description}
              onChange={(e: any) => handleChange('description', e?.html ?? e?.value ?? e?.target?.value ?? '')}
            />
          </div>
        </fieldset>
      </form>
      <DialogActionsBar>
        <button className="k-button" onClick={onClose}>
          Cancel
        </button>
        <button
          className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
          onClick={handleSubmit}
        >
          Save
        </button>
      </DialogActionsBar>
    </Dialog>
  );
};

export default TransactionDialog;
