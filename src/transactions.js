// src/transactions.js
import {
  List,
  Datagrid,
  TextField,
  NumberField,
  DateField,
} from 'react-admin';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { EmptyState } from './EmptyState';
import { TableSkeleton } from './LoadingState';
import { TextInput, SelectInput } from 'react-admin';

const TransactionFilters = [
  <TextInput label="Cari Invoice/Sekolah" source="invoice_number@ilike" alwaysOn />,
  <SelectInput 
    source="status" 
    label="Status"
    choices={[
      { id: 'paid', name: 'Paid' },
      { id: 'pending', name: 'Pending' },
      { id: 'overdue', name: 'Overdue' },
    ]} 
    alwaysOn
  />,
];

export const TransactionList = () => (
  <List
    filters={TransactionFilters}
    loading={<TableSkeleton />}
    empty={

      <EmptyState
        resource="transactions"
        icon={ReceiptIcon}
        message="Belum ada transaksi"
        actionLabel="+ Tambah Transaksi"
      />
    }
  >
    <Datagrid rowClick="show">
      <TextField source="id" label="ID" />
      <TextField source="invoice_number" label="Invoice" />
      <TextField source="school_name" label="Sekolah" />
      <NumberField 
        source="amount" 
        label="Jumlah"
        options={{ style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }}
      />
      <TextField source="status" label="Status" />
      <DateField source="date" label="Tanggal" />
    </Datagrid>
  </List>
);
