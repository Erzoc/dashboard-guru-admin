import {
  List,
  Datagrid,
  TextField,
  EmailField,
  DateField,
  NumberField,
  Create,
  SimpleForm,
  TextInput,
  Edit,
  Show,
  SimpleShowLayout,
  ShowButton,
  EditButton,
  SelectInput,
  useListContext,
} from 'react-admin';
import { Box, Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import SchoolIcon from '@mui/icons-material/School';
import { EmptyState } from './EmptyState';
import { TableSkeleton } from './LoadingState';

// Export Button Component
const ExportButton = () => {
  const { data, total } = useListContext();

  const handleExport = () => {
    // Prepare data for export
    const exportData = data.map(school => ({
      'ID': school.id,
      'Nama Sekolah': school.name,
      'Email': school.email,
      'Alamat': school.address,
      'Telepon': school.phone,
      'Paket': school.subscription_plan,
      'Status': school.subscription_status,
      'Total Guru': school.total_teachers,
      'Total Siswa': school.total_students,
      'MRR': school.mrr,
      'Tanggal Daftar': school.created_at,
    }));

    // Create worksheet
    const ws = XLSX.utils.json_to_sheet(exportData);
    
    // Set column widths
    ws['!cols'] = [
      { wch: 5 }, { wch: 30 }, { wch: 25 }, { wch: 40 },
      { wch: 15 }, { wch: 10 }, { wch: 10 }, { wch: 12 },
      { wch: 12 }, { wch: 15 }, { wch: 15 },
    ];

    // Create workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Data Sekolah');

    // Generate Excel file
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    
    // Download file
    const fileName = `Data_Sekolah_${new Date().toISOString().split('T')[0]}.xlsx`;
    saveAs(blob, fileName);
  };

  return (
    <Button
      onClick={handleExport}
      startIcon={<DownloadIcon />}
      variant="outlined"
      sx={{ ml: 2 }}
    >
      Export Excel ({total})
    </Button>
  );
};

// Filter Component
const SchoolFilters = [
  <TextInput label="Cari Sekolah" source="name@ilike" alwaysOn />,
  <SelectInput 
    source="subscription_plan" 
    label="Paket"
    choices={[
      { id: 'free', name: 'Free' },
      { id: 'pro', name: 'Pro' },
      { id: 'school', name: 'School' },
    ]} 
    alwaysOn
  />,
  <SelectInput 
    source="subscription_status" 
    label="Status"
    choices={[
      { id: 'active', name: 'Active' },
      { id: 'suspended', name: 'Suspended' },
    ]} 
  />,
];

// School List
export const SchoolList = () => (
  <List 
    filters={SchoolFilters}
    loading={<TableSkeleton />}
    actions={
      <Box display="flex" alignItems="center">
        <ExportButton />
      </Box>
    }
    empty={
      <EmptyState
        resource="schools"
        icon={SchoolIcon}
        message="Belum ada sekolah terdaftar"
        actionLabel="+ Tambah Sekolah Pertama"
      />
    }
  >

      <Datagrid rowClick="show">
      <TextField source="id" label="ID" />
      <TextField source="name" label="Nama Sekolah" />
      <EmailField source="email" label="Email" />
      <TextField source="subscription_plan" label="Paket" />
      <TextField source="subscription_status" label="Status" />
      <NumberField source="total_teachers" label="Guru" />
      <NumberField source="total_students" label="Siswa" />
      <NumberField 
        source="mrr" 
        label="MRR"
        options={{ style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }}
      />
      <DateField source="created_at" label="Terdaftar" />
      <ShowButton />
      <EditButton />
    </Datagrid>
  </List>
);

// School Create (existing code)
export const SchoolCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" label="Nama Sekolah" required />
      <TextInput source="email" label="Email" type="email" required />
      <TextInput source="address" label="Alamat" multiline rows={3} />
      <TextInput source="phone" label="Telepon" />
      <SelectInput
        source="subscription_plan"
        label="Paket"
        choices={[
          { id: 'free', name: 'Free' },
          { id: 'pro', name: 'Pro' },
          { id: 'school', name: 'School' },
        ]}
        defaultValue="free"
      />
      <SelectInput
        source="subscription_status"
        label="Status"
        choices={[
          { id: 'active', name: 'Active' },
          { id: 'suspended', name: 'Suspended' },
        ]}
        defaultValue="active"
      />
      <NumberField source="total_teachers" label="Total Guru" defaultValue={0} />
      <NumberField source="total_students" label="Total Siswa" defaultValue={0} />
      <NumberField source="mrr" label="MRR" defaultValue={0} />
    </SimpleForm>
  </Create>
);

// School Edit (existing code)
export const SchoolEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" label="Nama Sekolah" required />
      <TextInput source="email" label="Email" type="email" required />
      <TextInput source="address" label="Alamat" multiline rows={3} />
      <TextInput source="phone" label="Telepon" />
      <SelectInput
        source="subscription_plan"
        label="Paket"
        choices={[
          { id: 'free', name: 'Free' },
          { id: 'pro', name: 'Pro' },
          { id: 'school', name: 'School' },
        ]}
      />
      <SelectInput
        source="subscription_status"
        label="Status"
        choices={[
          { id: 'active', name: 'Active' },
          { id: 'suspended', name: 'Suspended' },
        ]}
      />
    </SimpleForm>
  </Edit>
);

// School Show (existing code)
export const SchoolShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" label="ID" />
      <TextField source="name" label="Nama Sekolah" />
      <EmailField source="email" label="Email" />
      <TextField source="address" label="Alamat" />
      <TextField source="phone" label="Telepon" />
      <TextField source="subscription_plan" label="Paket" />
      <TextField source="subscription_status" label="Status" />
      <NumberField source="total_teachers" label="Total Guru" />
      <NumberField source="total_students" label="Total Siswa" />
      <NumberField source="mrr" label="MRR" />
      <DateField source="created_at" label="Tanggal Daftar" />
    </SimpleShowLayout>
  </Show>
);
