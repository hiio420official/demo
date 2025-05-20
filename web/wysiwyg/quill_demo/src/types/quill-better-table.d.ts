declare module 'quill-better-table' {
  import Quill from 'quill';

  interface TableModule {
    insertTable: (rows: number, columns: number) => void;
    insertColumnRight: () => void;
    insertColumnLeft: () => void;
    insertRowUp: () => void;
    insertRowDown: () => void;
    deleteColumn: () => void;
    deleteRow: () => void;
    deleteTable: () => void;
  }

  const Table: {
    new(): TableModule;
  };

  export default Table;
} 