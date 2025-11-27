// src/Menu.js
import { Menu } from 'react-admin';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import PaymentIcon from '@mui/icons-material/Payment';

export const CustomMenu = () => (
  <Menu>
    <Menu.Item 
      to="/schools" 
      primaryText="Sekolah" 
      leftIcon={<SchoolIcon />} 
    />
    <Menu.Item 
      to="/users" 
      primaryText="Pengguna" 
      leftIcon={<PeopleIcon />} 
    />
    <Menu.Item 
      to="/transactions" 
      primaryText="Transaksi" 
      leftIcon={<PaymentIcon />} 
    />
  </Menu>
);
