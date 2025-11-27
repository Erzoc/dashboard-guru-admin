// src/theme.js
import { defaultTheme } from 'react-admin';

export const theme = {
  ...defaultTheme,
  palette: {
    primary: {
      main: '#208091', // Teal - brand color Dashboard Guru
    },
    secondary: {
      main: '#1A5F6D', // Dark Teal
    },
    success: {
      main: '#4CAF50', // Green
    },
    warning: {
      main: '#FF9800', // Orange
    },
    error: {
      main: '#f44336', // Red
    },
    background: {
      default: '#f5f5f5', // Light gray background
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  sidebar: {
    width: 240,
    closedWidth: 55,
  },
  components: {
    ...defaultTheme.components,
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#208091',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
  },
};
