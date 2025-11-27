// src/Layout.js
import { Layout, AppBar } from 'react-admin';
import { CustomMenu } from './Menu';  // ← PASTIKAN ADA INI!
import { Box, Typography } from '@mui/material';

const CustomAppBar = () => (
  <AppBar>
    <Box display="flex" alignItems="center" gap={2} px={2}>
      <Typography variant="h6" color="inherit" fontWeight="bold">
        Dashboard Guru Indonesia
      </Typography>
    </Box>
  </AppBar>
);

export const CustomLayout = (props) => (
  <Layout 
    {...props} 
    appBar={CustomAppBar} 
    menu={CustomMenu}  // ← PASTIKAN ADA INI!
  />
);

