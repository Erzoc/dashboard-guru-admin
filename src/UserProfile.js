// src/UserProfile.js
import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  TextField, 
  Button,
  Avatar,
  Grid,
  Alert,
  Divider
} from '@mui/material';
import { useNotify } from 'react-admin';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';


const supabaseUrl = 'https://xtlqmlecilqwqejrkcsp.supabase.co'; // Ganti dengan URL Anda
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0bHFtbGVjaWxxd3FlanJrY3NwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyMjk5NzMsImV4cCI6MjA3OTgwNTk3M30.8FMyRxb8h9o5meM01ZQQPVYlI_VyV_zF_1iaf1mV468'; // Ganti dengan Key Anda
const supabase = createClient(supabaseUrl, supabaseKey);

export const UserProfile = () => {
  const notify = useNotify();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem('auth'));
    if (authData) {
      setUser(authData);
      setFormData({
        name: authData.name || '',
        email: authData.email || '',
        phone: authData.phone || '',
      });
    }
  }, []);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('users')
        .update({
          name: formData.name,
          phone: formData.phone,
        })
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;

      // Update localStorage
      const updatedUser = { ...user, ...data };
      localStorage.setItem('auth', JSON.stringify(updatedUser));
      setUser(updatedUser);

      notify('Profile berhasil diupdate!', { type: 'success' });
    } catch (error) {
      notify('Gagal update profile: ' + error.message, { type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
  e.preventDefault();

  if (passwordData.newPassword !== passwordData.confirmPassword) {
    notify('Password baru tidak cocok!', { type: 'error' });
    return;
  }

  if (passwordData.newPassword.length < 6) {
    notify('Password minimal 6 karakter!', { type: 'error' });
    return;
  }

  setLoading(true);

  try {
    // Verify current password
    const { data: userData, error: verifyError } = await supabase
      .from('users')
      .select('password')
      .eq('id', user.id)
      .single();

    if (verifyError) throw verifyError;

    // Compare current password dengan bcrypt
    const isCurrentPasswordValid = await bcrypt.compare(
      passwordData.currentPassword, 
      userData.password
    );

    if (!isCurrentPasswordValid) {
      throw new Error('Password lama salah!');
    }

    // Hash password baru
    const hashedPassword = await bcrypt.hash(passwordData.newPassword, 10);

    // Update password
    const { error: updateError } = await supabase
      .from('users')
      .update({ password: hashedPassword })
      .eq('id', user.id);

    if (updateError) throw updateError;

    notify('Password berhasil diubah!', { type: 'success' });
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  } catch (error) {
    notify('Gagal ubah password: ' + error.message, { type: 'error' });
  } finally {
    setLoading(false);
  }
};


  if (!user) return null;

  return (
    <Box sx={{ p: 3, maxWidth: 1200, margin: '0 auto' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Profil Saya
      </Typography>
      <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
        Kelola informasi profil dan keamanan akun Anda
      </Typography>

      <Grid container spacing={3}>
        {/* Profile Info */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Informasi Profil
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <form onSubmit={handleProfileUpdate}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Nama Lengkap"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      value={formData.email}
                      disabled
                      helperText="Email tidak dapat diubah"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Nomor Telepon"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={loading}
                      sx={{
                        background: 'linear-gradient(135deg, #208091 0%, #1a6470 100%)',
                      }}
                    >
                      {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>

          {/* Change Password */}
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Ubah Password
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Alert severity="info" sx={{ mb: 3 }}>
                Password minimal 6 karakter
              </Alert>

              <form onSubmit={handlePasswordChange}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="password"
                      label="Password Lama"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="password"
                      label="Password Baru"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="password"
                      label="Konfirmasi Password Baru"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={loading}
                      sx={{
                        background: 'linear-gradient(135deg, #208091 0%, #1a6470 100%)',
                      }}
                    >
                      {loading ? 'Mengubah...' : 'Ubah Password'}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>

        {/* Profile Summary Card */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  margin: '0 auto 20px',
                  bgcolor: '#208091',
                  fontSize: 40,
                }}
              >
                {user.name?.charAt(0).toUpperCase()}
              </Avatar>
              <Typography variant="h6" fontWeight="bold">
                {user.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                {user.email}
              </Typography>
              <Box
                sx={{
                  display: 'inline-block',
                  px: 2,
                  py: 0.5,
                  borderRadius: 1,
                  bgcolor: user.role === 'super_admin' ? '#ff9800' : '#2196f3',
                  color: 'white',
                  fontSize: '0.875rem',
                  fontWeight: 'bold',
                  mb: 2,
                }}
              >
                {user.role === 'super_admin' ? 'Super Admin' : 
                 user.role === 'school_admin' ? 'School Admin' : 'Teacher'}
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ textAlign: 'left' }}>
                <Typography variant="caption" color="textSecondary">
                  Status Akun
                </Typography>
                <Typography variant="body2" fontWeight="bold" color="success.main">
                  {user.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
