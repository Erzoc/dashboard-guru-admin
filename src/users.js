// src/users.js
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  DateField,
} from 'react-admin';
import PeopleIcon from '@mui/icons-material/People';
import { EmptyState } from './EmptyState';
import { TableSkeleton } from './LoadingState';
import { TextInput, SelectInput } from 'react-admin';

const UserFilters = [
  <TextInput label="Cari Nama/Email" source="name@ilike" alwaysOn />,
  <SelectInput 
    source="role" 
    label="Role"
    choices={[
      { id: 'super_admin', name: 'Super Admin' },
      { id: 'school_admin', name: 'School Admin' },
      { id: 'teacher', name: 'Teacher' },
    ]} 
    alwaysOn
  />,
  <SelectInput 
    source="status" 
    label="Status"
    choices={[
      { id: 'active', name: 'Active' },
      { id: 'inactive', name: 'Inactive' },
    ]} 
  />,
];

export const UserList = () => (
  <List
    filters={UserFilters}
    loading={<TableSkeleton />}
    empty={

      <EmptyState
        resource="users"
        icon={PeopleIcon}
        message="Belum ada pengguna"
        actionLabel="+ Tambah Pengguna"
      />
    }
  >
    <Datagrid rowClick="show">
      <TextField source="id" label="ID" />
      <TextField source="name" label="Nama" />
      <EmailField source="email" label="Email" />
      <TextField source="role" label="Role" />
      <TextField source="status" label="Status" />
      <DateField source="created_at" label="Terdaftar" />
    </Datagrid>
  </List>
);
