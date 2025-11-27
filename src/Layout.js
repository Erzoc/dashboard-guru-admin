// src/Layout.js
import { Layout, AppBar, Logout, MenuItemLink } from 'react-admin';
import { CustomMenu } from './Menu';
import { Box, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// Custom AppBar with Profile Link in UserMenu
const CustomAppBar = () => (
  <AppBar 
    sx={{ backgroundColor: '#208091' }}
  >
    <Box display="flex" alignItems="center" gap={2} px={2} flex={1}>
      <Typography variant="h6" color="inherit" fontWeight="bold">
        Dashboard Guru Indonesia
      </Typography>
    </Box>
  </AppBar>
);

// Custom Layout
export const CustomLayout = (props) => (
  <Layout 
    {...props} 
    appBar={CustomAppBar} 
    menu={CustomMenu}
  />
);
