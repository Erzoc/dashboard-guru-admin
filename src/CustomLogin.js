// src/CustomLogin.js
import * as React from 'react';
import { useState } from 'react';
import { useLogin, useNotify } from 'react-admin';
import { 
  Box, 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  Typography,
  InputAdornment,
  IconButton,
  CircularProgress
} from '@mui/material';
import { Visibility, VisibilityOff, Lock, Email } from '@mui/icons-material';

export const CustomLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const login = useLogin();
  const notify = useNotify();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    login({ username: email, password })
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        notify(
          error?.message || 'Email atau password salah. Silakan coba lagi.',
          { type: 'error' }
        );
      });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #208091 0%, #1a6470 50%, #134d57 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Logo & Title */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          }}
        >
          <Typography
            variant="h3"
            sx={{
              color: '#208091',
              fontWeight: 'bold',
            }}
          >
            DG
          </Typography>
        </Box>
        <Typography
          variant="h4"
          sx={{
            color: 'white',
            fontWeight: 'bold',
            mb: 1,
            textShadow: '0 2px 4px rgba(0,0,0,0.2)',
          }}
        >
          Dashboard Guru Indonesia
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: 'rgba(255,255,255,0.9)',
            textShadow: '0 1px 2px rgba(0,0,0,0.2)',
          }}
        >
          Platform Manajemen Sekolah Digital
        </Typography>
      </Box>

      {/* Login Card */}
      <Card
        sx={{
          width: '100%',
          maxWidth: 450,
          mx: 2,
          boxShadow: '0 16px 48px rgba(0,0,0,0.3)',
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="h5"
            sx={{
              mb: 3,
              fontWeight: 'bold',
              textAlign: 'center',
              color: '#208091',
            }}
          >
            Masuk ke Akun Anda
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
              autoFocus
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      disabled={loading}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #208091 0%, #1a6470 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #1a6470 0%, #134d57 100%)',
                },
                boxShadow: '0 4px 12px rgba(32, 128, 145, 0.3)',
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Masuk'
              )}
            </Button>
          </form>

          {/* Demo Credentials */}
          <Box
            sx={{
              mt: 4,
              p: 2,
              bgcolor: '#f5f5f5',
              borderRadius: 1,
              border: '1px solid #e0e0e0',
            }}
          >
            <Typography
              variant="caption"
              sx={{
                display: 'block',
                fontWeight: 'bold',
                mb: 1,
                color: '#666',
              }}
            >
              🔐 Akun Demo:
            </Typography>
            <Typography variant="caption" sx={{ display: 'block', mb: 0.5 }}>
              <strong>Super Admin:</strong> superadmin@dashboardguru.id / admin123
            </Typography>
            <Typography variant="caption" sx={{ display: 'block', mb: 0.5 }}>
              <strong>School Admin:</strong> admin1@school.id / school123
            </Typography>
            <Typography variant="caption" sx={{ display: 'block' }}>
              <strong>Teacher:</strong> guru1@school.id / guru123
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Footer */}
      <Typography
        variant="body2"
        sx={{
          mt: 4,
          color: 'rgba(255,255,255,0.8)',
          textAlign: 'center',
        }}
      >
        © 2025 Dashboard Guru Indonesia. All rights reserved.
      </Typography>
    </Box>
  );
};
