'use client';

import { useState, useRef } from 'react';
import {
  Grid,
  GridColumn,
  GridToolbar,
} from '@progress/kendo-react-grid';
import { ExcelExport } from '@progress/kendo-react-excel-export';
import { process, State } from '@progress/kendo-data-query';
import { useAppStore } from '@/store';

const initialDataState: State = {
  sort: [{ field: 'date', dir: 'desc' }],
  take: 10,
  skip: 0,
  group: [{ field: 'category' }],
};

const TransactionGrid = () => {
  const transactions = useAppStore((state) => state.transactions);
  const [dataState, setDataState] = useState<State>(initialDataState);
  const excelExportRef = useRef<ExcelExport>(null);

  const dataResult = process(transactions, dataState);

  const exportToExcel = () => {
    excelExportRef.current?.save();
  };

  return (
    <ExcelExport data={transactions} ref={excelExportRef}>
      <Grid
        data={dataResult}
        {...dataState}
        onDataStateChange={(e) => setDataState(e.dataState)}
        sortable
        pageable
        filterable
        groupable
        style={{ height: '600px' }}
      >
        <GridToolbar>
          <button
            title="Export to Excel"
            className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
            onClick={exportToExcel}
          >
            Export to Excel
          </button>
        </GridToolbar>
        <GridColumn field="date" title="Date" filter="date" format="{0:yyyy-MM-dd HH:mm}" />
        <GridColumn field="category" title="Category" />
        <GridColumn field="amount" title="Amount" filter="numeric" format="{0:c}" />
        <GridColumn field="description" title="Description" />
        <GridColumn field="tags" title="Tags" />
      </Grid>
    </ExcelExport>
  );
};

export default TransactionGrid;
