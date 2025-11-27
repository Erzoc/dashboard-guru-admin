// src/EmptyState.js
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useCreatePath } from 'react-admin';
import { useNavigate } from 'react-router-dom';

export const EmptyState = ({ resource, icon: Icon, message, actionLabel }) => {
  const createPath = useCreatePath();
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate(createPath({ resource, type: 'create' }));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px',
        textAlign: 'center',
        py: 8,
      }}
    >
      <Box
        sx={{
          width: 120,
          height: 120,
          borderRadius: '50%',
          backgroundColor: '#f5f5f5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 3,
        }}
      >
        <Icon sx={{ fontSize: 60, color: '#208091' }} />
      </Box>
      
      <Typography variant="h5" fontWeight="bold" gutterBottom color="textPrimary">
        {message || 'Belum ada data'}
      </Typography>
      
      <Typography variant="body1" color="textSecondary" sx={{ mb: 4, maxWidth: 400 }}>
        Data akan muncul di sini setelah Anda menambahkan yang pertama.
      </Typography>
      
      {actionLabel && (
        <Button
          variant="contained"
          size="large"
          onClick={handleCreate}
          sx={{
            background: 'linear-gradient(135deg, #208091 0%, #1a6470 100%)',
            px: 4,
            py: 1.5,
            fontSize: '1rem',
            fontWeight: 'bold',
            '&:hover': {
              background: 'linear-gradient(135deg, #1a6470 0%, #134d57 100%)',
            },
          }}
        >
          {actionLabel}
        </Button>
      )}
    </Box>
  );
};
