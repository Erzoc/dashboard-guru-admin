import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import { theme } from './theme';
import { CustomLayout } from './Layout';
import { SchoolList, SchoolCreate, SchoolEdit, SchoolShow } from './schools';

const dataProvider = jsonServerProvider('http://localhost:3001');

function App() {
  return (
    <Admin 
      dataProvider={dataProvider} 
      theme={theme} 
      title="Dashboard Guru Indonesia"
      layout={CustomLayout}
    >
      <Resource 
        name="schools" 
        list={SchoolList}
        create={SchoolCreate}
        edit={SchoolEdit}
        show={SchoolShow}
      />
      <Resource name="users" />
      <Resource name="transactions" />
    </Admin>
  );
}

export default App;
