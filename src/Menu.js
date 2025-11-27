// src/Menu.js
import { Menu, usePermissions } from 'react-admin';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const CustomMenu = () => {
  const { permissions } = usePermissions();

  return (
    <Menu>
      <Menu.DashboardItem />
      
      {/* Profile - Semua role bisa akses */}
      <Menu.Item
        to="/profile"
        primaryText="Profil Saya"
        leftIcon={<AccountCircleIcon />}
      />
      
      {/* Super Admin - Full Access */}
      {permissions === 'super_admin' && (
        <>
          <Menu.ResourceItem name="schools" />
          <Menu.ResourceItem name="users" />
          <Menu.ResourceItem name="transactions" />
        </>
      )}
      
      {/* School Admin - Limited Access */}
      {permissions === 'school_admin' && (
        <>
          <Menu.ResourceItem name="users" />
          <Menu.ResourceItem name="schools" />
        </>
      )}
      
      {/* Teacher - Minimal Access */}
      {permissions === 'teacher' && (
        <>
          <Menu.ResourceItem name="schools" />
        </>
      )}
    </Menu>
  );
};
