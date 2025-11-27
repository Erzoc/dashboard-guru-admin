import { Admin, Resource, CustomRoutes } from 'react-admin';
import { Route } from 'react-router-dom';
import { supabaseDataProvider } from './supabaseDataProvider';
import { authProvider } from './authProvider';
import { CustomLogin } from './CustomLogin';
import { UserProfile } from './UserProfile';
import { theme } from './theme';
import { CustomLayout } from './Layout';
import { Dashboard } from './Dashboard';
import { SchoolList, SchoolCreate, SchoolEdit, SchoolShow } from './schools';
import { UserList } from './users';
import { TransactionList } from './transactions';

const dataProvider = supabaseDataProvider;

function App() {
  return (
    <Admin 
      dataProvider={dataProvider} 
      authProvider={authProvider}
      loginPage={CustomLogin}
      theme={theme} 
      title="Dashboard Guru Indonesia"
      layout={CustomLayout}
      dashboard={Dashboard}
    >
      {permissions => (
        <>
          {/* Custom Routes - Di luar permissions check */}
          <CustomRoutes>
            <Route path="/profile" element={<UserProfile />} />
          </CustomRoutes>
          
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
              <Resource name="users" list={UserList} />
              <Resource name="transactions" list={TransactionList} />
            </>
          )}
          
          {/* School Admin - Limited Access */}
          {permissions === 'school_admin' && (
            <>
              <Resource name="users" list={UserList} options={{ label: 'Kelola Guru' }} />
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
