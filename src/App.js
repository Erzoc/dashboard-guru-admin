import { Admin, Resource } from 'react-admin';
import { supabaseDataProvider } from './supabaseDataProvider';
import { authProvider } from './authProvider';
import { theme } from './theme';
import { CustomLayout } from './Layout';
import { Dashboard } from './Dashboard';
import { SchoolList, SchoolCreate, SchoolEdit, SchoolShow } from './schools';

const dataProvider = supabaseDataProvider;

function App() {
  return (
    <Admin 
      dataProvider={dataProvider} 
      authProvider={authProvider}
      theme={theme} 
      title="Dashboard Guru Indonesia"
      layout={CustomLayout}
      dashboard={Dashboard}
    >
      {permissions => (
        <>
          {/* Super Admin - Full Access */}
          {permissions === 'super_admin' && (
            <>
              <Resource 
                name="schools" 
                list={SchoolList}
                create={SchoolCreate}
                edit={SchoolEdit}
                show={SchoolShow}
              />
              <Resource name="users" />
              <Resource name="transactions" />
            </>
          )}
          
          {/* School Admin - Limited Access */}
          {permissions === 'school_admin' && (
            <>
              <Resource name="users" options={{ label: 'Kelola Guru' }} />
              <Resource name="schools" list={SchoolList} />
            </>
          )}
          
          {/* Teacher - Minimal Access */}
          {permissions === 'teacher' && (
            <>
              <Resource name="schools" list={SchoolList} />
            </>
          )}
        </>
      )}
    </Admin>
  );
}

export default App;
