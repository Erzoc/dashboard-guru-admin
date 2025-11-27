// src/schools.js
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  NumberField,
  Create,
  SimpleForm,
  TextInput,
  SelectInput,
  NumberInput,
  Edit,
  Show,
  SimpleShowLayout,
  EditButton,
  ShowButton,
  DeleteButton,
} from 'react-admin';

// LIST VIEW (dengan action buttons)
export const SchoolList = () => (
  <List>
    <Datagrid>
      <TextField source="id" label="ID" />
      <TextField source="name" label="Nama Sekolah" />
      <EmailField source="email" label="Email" />
      <TextField source="subscription_plan" label="Plan" />
      <TextField source="subscription_status" label="Status" />
      <NumberField source="total_teachers" label="Guru" />
      <NumberField source="total_students" label="Siswa" />
      <ShowButton />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

// CREATE VIEW (form tambah data)
export const SchoolCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" label="Nama Sekolah" required fullWidth />
      <TextInput source="email" label="Email" type="email" required fullWidth />
      <TextInput source="address" label="Alamat" multiline rows={3} fullWidth />
      <TextInput source="phone" label="Telepon" fullWidth />
      
      <SelectInput 
        source="subscription_plan" 
        label="Paket Langganan"
        choices={[
          { id: 'free', name: 'Free' },
          { id: 'pro', name: 'Pro' },
          { id: 'school', name: 'School' },
        ]}
        defaultValue="free"
        required
      />
      
      <SelectInput 
        source="subscription_status" 
        label="Status"
        choices={[
          { id: 'active', name: 'Active' },
          { id: 'inactive', name: 'Inactive' },
          { id: 'suspended', name: 'Suspended' },
        ]}
        defaultValue="active"
        required
      />
      
      <NumberInput source="total_teachers" label="Jumlah Guru" defaultValue={0} />
      <NumberInput source="total_students" label="Jumlah Siswa" defaultValue={0} />
      <NumberInput source="mrr" label="MRR (Rp)" defaultValue={0} />
    </SimpleForm>
  </Create>
);

// EDIT VIEW (form edit data)
export const SchoolEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" label="Nama Sekolah" required fullWidth />
      <TextInput source="email" label="Email" type="email" required fullWidth />
      <TextInput source="address" label="Alamat" multiline rows={3} fullWidth />
      <TextInput source="phone" label="Telepon" fullWidth />
      
      <SelectInput 
        source="subscription_plan" 
        label="Paket Langganan"
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
          { id: 'inactive', name: 'Inactive' },
          { id: 'suspended', name: 'Suspended' },
        ]}
      />
      
      <NumberInput source="total_teachers" label="Jumlah Guru" />
      <NumberInput source="total_students" label="Jumlah Siswa" />
      <NumberInput source="mrr" label="MRR (Rp)" />
    </SimpleForm>
  </Edit>
);

// SHOW VIEW (detail view)
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
      <NumberField source="mrr" label="MRR (Rp)" />
      <TextField source="created_at" label="Bergabung" />
    </SimpleShowLayout>
  </Show>
);
