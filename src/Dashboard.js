// src/Dashboard.js
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import { useDataProvider } from 'react-admin';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import GroupsIcon from '@mui/icons-material/Groups';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { DashboardSkeleton } from './LoadingState';


// Stats Card Component
const StatsCard = ({ title, value, subtitle, icon: Icon, color }) => (
  <Card sx={{ height: '100%', background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`, color: 'white' }}>
    <CardContent>
      <Box display="flex" justifyContent="space-between" alignItems="flex-start">
        <Box>
          <Typography variant="h6" gutterBottom sx={{ opacity: 0.9 }}>
            {title}
          </Typography>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            {value}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            {subtitle}
          </Typography>
        </Box>
        <Box sx={{ backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 2, p: 1.5 }}>
          <Icon sx={{ fontSize: 40 }} />
        </Box>
      </Box>
    </CardContent>
  </Card>
);

// Main Dashboard Component
export const Dashboard = () => {
  const dataProvider = useDataProvider();
  const [stats, setStats] = useState({
    totalSchools: 0,
    totalTeachers: 0,
    totalStudents: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch schools
        const schoolsResponse = await dataProvider.getList('schools', {
          pagination: { page: 1, perPage: 100 },
          sort: { field: 'id', order: 'ASC' },
          filter: {},
        });

        const schools = schoolsResponse.data;
        const totalSchools = schools.length;
        const totalTeachers = schools.reduce((sum, school) => sum + (school.total_teachers || 0), 0);
        const totalStudents = schools.reduce((sum, school) => sum + (school.total_students || 0), 0);
        const totalRevenue = schools.reduce((sum, school) => sum + (school.mrr || 0), 0);

        setStats({
          totalSchools,
          totalTeachers,
          totalStudents,
          totalRevenue,
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [dataProvider]);

  // Mock data untuk charts
  const revenueData = [
    { month: 'Jun', revenue: 35 },
    { month: 'Jul', revenue: 42 },
    { month: 'Agu', revenue: 48 },
    { month: 'Sep', revenue: 52 },
    { month: 'Okt', revenue: 58 },
    { month: 'Nov', revenue: 67 },
  ];

  const userGrowthData = [
    { month: 'Jun', guru: 850 },
    { month: 'Jul', guru: 920 },
    { month: 'Agu', guru: 1050 },
    { month: 'Sep', guru: 1180 },
    { month: 'Okt', guru: 1320 },
    { month: 'Nov', guru: stats.totalTeachers },
  ];

  if (loading) {
  return <DashboardSkeleton />;
}


  return (
    <Box p={3}>
      {/* Header */}
      <Box mb={4}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Dashboard Overview
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Selamat datang di Dashboard Guru Indonesia
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Total Sekolah"
            value={stats.totalSchools}
            subtitle="Sekolah terdaftar"
            icon={SchoolIcon}
            color="#208091"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Total Guru"
            value={stats.totalTeachers.toLocaleString('id-ID')}
            subtitle="Guru aktif"
            icon={PeopleIcon}
            color="#2196F3"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Total Siswa"
            value={stats.totalStudents.toLocaleString('id-ID')}
            subtitle="Siswa terdaftar"
            icon={GroupsIcon}
            color="#4CAF50"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="MRR"
            value={`Rp ${(stats.totalRevenue / 1000000).toFixed(1)}jt`}
            subtitle="+15.3% vs bulan lalu"
            icon={AttachMoneyIcon}
            color="#FF9800"
          />
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>
        {/* Revenue Chart */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Pertumbuhan Revenue (6 Bulan)
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => `Rp ${value}jt`} />
                  <Line type="monotone" dataKey="revenue" stroke="#208091" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* User Growth Chart */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Pertumbuhan Guru (6 Bulan)
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="guru" fill="#2196F3" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Quick Stats */}
      <Box mt={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Ringkasan Platform
            </Typography>
            <Grid container spacing={2} mt={1}>
              <Grid item xs={6} md={3}>
                <Typography variant="body2" color="textSecondary">Sekolah Aktif</Typography>
                <Typography variant="h5" fontWeight="bold">{stats.totalSchools}</Typography>
              </Grid>
              <Grid item xs={6} md={3}>
                <Typography variant="body2" color="textSecondary">Rata-rata Guru/Sekolah</Typography>
                <Typography variant="h5" fontWeight="bold">
                  {stats.totalSchools > 0 ? Math.round(stats.totalTeachers / stats.totalSchools) : 0}
                </Typography>
              </Grid>
              <Grid item xs={6} md={3}>
                <Typography variant="body2" color="textSecondary">Rata-rata Siswa/Sekolah</Typography>
                <Typography variant="h5" fontWeight="bold">
                  {stats.totalSchools > 0 ? Math.round(stats.totalStudents / stats.totalSchools) : 0}
                </Typography>
              </Grid>
              <Grid item xs={6} md={3}>
                <Typography variant="body2" color="textSecondary">ARR (Annual)</Typography>
                <Typography variant="h5" fontWeight="bold">
                  Rp {((stats.totalRevenue * 12) / 1000000).toFixed(1)}jt
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
