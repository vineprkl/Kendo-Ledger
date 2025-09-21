import React from 'react';

// Basic container that passes through children and props
export const Dialog: React.FC<{ title?: React.ReactNode; onClose?: () => void; children?: React.ReactNode }>
  = ({ title, children }) => (
    <div role="dialog">
      {title ? <div>{title}</div> : null}
      {children}
    </div>
  );

export const DialogActionsBar: React.FC<{ children?: React.ReactNode }>
  = ({ children }) => <div data-testid="DialogActionsBar">{children}</div>;

// Simple controlled input to emulate Kendo NumericTextBox behavior
export const NumericTextBox: React.FC<{ value?: number; onChange?: (e: any) => void }>
  = ({ value = 0, onChange }) => (
    <input
      role="spinbutton"
      type="number"
      value={value}
      onChange={(e) => onChange?.({ value: e.currentTarget.value, target: e.currentTarget })}
    />
  );

// Simple select to emulate Kendo DropDownList
export const DropDownList: React.FC<{ data: any[]; value?: any; onChange?: (e: any) => void }>
  = ({ data = [], value, onChange }) => (
    <select
      value={value}
      onChange={(e) => onChange?.({ value: e.currentTarget.value, target: e.currentTarget })}
    >
      {data.map((d, i) => (
        <option key={i} value={d}>{String(d)}</option>
      ))}
    </select>
  );

// Simple multi-select using a text input placeholder (not used in tests)
export const MultiSelect: React.FC<{ data: any[]; value?: any[]; onChange?: (e: any) => void }>
  = ({ value = [], onChange }) => (
    <input
      aria-label="multiselect"
      value={(value as any[]).join(',')}
      onChange={(e) => onChange?.({ value: e.currentTarget.value.split(','), target: e.currentTarget })}
    />
  );

// Simple textarea to emulate Kendo Editor
export const Editor: React.FC<{ value?: string; onChange?: (e: any) => void }>
  = ({ value = '', onChange }) => (
    <textarea
      value={value}
      onChange={(e) => onChange?.({ html: e.currentTarget.value, value: e.currentTarget.value, target: e.currentTarget })}
    />
  );

// Other exports used by different Kendo packages can be added here if needed

// DateRangePicker stub
export const DateRangePicker: React.FC<{ value?: any; onChange?: (e: any) => void }>
  = ({ value, onChange }) => (
    <div data-testid="DateRangePicker" onClick={() => onChange?.({ value })} />
  );

// Grid stubs
export const Grid: React.FC<any> = (props: any) => {
  const { children, onDataStateChange, sort, skip, take, filter, group } = props || {};
  const stateSnapshot = { sort, skip, take, filter, group };
  const nextPage = () => {
    const newSkip = (skip || 0) + (take || 10);
    onDataStateChange?.({ dataState: { sort, skip: newSkip, take: take || 10, filter, group } });
  };
  const sortAmountAsc = () => {
    onDataStateChange?.({ dataState: { sort: [{ field: 'amount', dir: 'asc' }], skip: skip || 0, take: take || 10, filter, group } });
  };
  const applyFilterGt0 = () => {
    onDataStateChange?.({ dataState: { sort, skip: 0, take: take || 10, group, filter: { logic: 'and', filters: [{ field: 'amount', operator: 'gt', value: 0 }] } } });
  };
  const clearFilter = () => {
    onDataStateChange?.({ dataState: { sort, skip: 0, take: take || 10, group } });
  };
  const clearGroup = () => {
    onDataStateChange?.({ dataState: { sort, skip: skip || 0, take: take || 10, filter, group: [] } });
  };
  const groupByCategory = () => {
    onDataStateChange?.({ dataState: { sort, skip: skip || 0, take: take || 10, filter, group: [{ field: 'category' }] } });
  };
  return (
    <div data-testid="Grid">
      <pre data-testid="grid-state">{JSON.stringify(stateSnapshot)}</pre>
      <button onClick={sortAmountAsc}>SortAmountAsc</button>
      <button onClick={nextPage}>NextPage</button>
      <button onClick={applyFilterGt0}>ApplyFilterGt0</button>
      <button onClick={clearFilter}>ClearFilter</button>
      <button onClick={clearGroup}>ClearGroup</button>
      <button onClick={groupByCategory}>GroupByCategory</button>
      {children}
    </div>
  );
};
export const GridColumn: React.FC<any> = ({ title }) => <div data-testid="GridColumn">{title}</div>;
export const GridToolbar: React.FC<any> = ({ children }) => <div data-testid="GridToolbar">{children}</div>;

// ExcelExport stub with imperative save
export const ExcelExport = React.forwardRef<any, { data?: any[]; children?: React.ReactNode }>((props, ref) => {
  React.useImperativeHandle(ref, () => ({
    save: () => { (window as any).__excelSaved = true; },
  }));
  return <div data-testid="ExcelExport">{props.children}</div>;
});

// Scheduler stub
export const Scheduler: React.FC<{ data?: any; onDataChange?: (e: any) => void }>
  = ({ onDataChange }) => (
    <div data-testid="Scheduler">
      <button onClick={() => onDataChange?.({ created: (window as any).__schedulerCreated })}>create</button>
      <button onClick={() => onDataChange?.({ updated: (window as any).__schedulerUpdated })}>update</button>
      <button onClick={() => onDataChange?.({ deleted: (window as any).__schedulerDeleted })}>delete</button>
    </div>
  );

// Sortable stub
export const Sortable: React.FC<{ id?: string; data?: any[]; onDrop?: (e: any) => void; itemUI?: any }>
  = ({ id, data = [], onDrop }) => (
    <div data-testid={`sortable-${id}`}>
      {(data || []).map((item, idx) => (
        <div key={idx}>
          <span>{String(item?.description ?? '')}</span>
        </div>
      ))}
      <button onClick={() => onDrop?.({ dragged: { data: (window as any).__draggedData } })}>DropHere</button>
    </div>
  );

// Charts stubs
export const Chart: React.FC<any> = ({ children }) => <div data-testid="Chart">{children}</div>;
export const ChartSeries: React.FC<any> = ({ children }) => <div data-testid="ChartSeries">{children}</div>;
export const ChartSeriesItem: React.FC<any> = ({ children }) => <div data-testid="ChartSeriesItem">{children}</div>;
export const ChartTitle: React.FC<{ text?: string }> = ({ text }) => <div data-testid="ChartTitle">{text}</div>;
export const ChartLegend: React.FC<any> = ({ children }) => <div data-testid="ChartLegend">{children}</div>;
export const ChartCategoryAxis: React.FC<any> = ({ children }) => <div data-testid="ChartCategoryAxis">{children}</div>;
export const ChartCategoryAxisItem: React.FC<any> = ({ children }) => <div data-testid="ChartCategoryAxisItem">{children}</div>;
export const ChartValueAxis: React.FC<any> = ({ children }) => <div data-testid="ChartValueAxis">{children}</div>;
export const ChartValueAxisItem: React.FC<any> = ({ children }) => <div data-testid="ChartValueAxisItem">{children}</div>;

// data-query stubs
export const process = (data: any) => data;
export type State = any;

// Notification stubs
export const NotificationGroup: React.FC<any> = ({ children }) => (
  <div data-testid="NotificationGroup">{children}</div>
);
export const Notification: React.FC<{ type?: any; closable?: boolean; onClose?: () => void; children?: React.ReactNode }>
  = ({ closable, onClose, children }) => (
    <div role="alert">
      <span>{children as any}</span>
      {closable ? <button aria-label="close" onClick={onClose}>x</button> : null}
    </div>
  );
