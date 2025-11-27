// src/LoadingState.js
import React from 'react';
import { Box, Skeleton, Card, CardContent, Grid } from '@mui/material';

export const TableSkeleton = () => (
  <Box sx={{ p: 2 }}>
    {[...Array(5)].map((_, index) => (
      <Box key={index} sx={{ mb: 2 }}>
        <Skeleton variant="rectangular" height={60} sx={{ borderRadius: 1 }} />
      </Box>
    ))}
  </Box>
);

export const DashboardSkeleton = () => (
  <Box sx={{ p: 3 }}>
    {/* Header Skeleton */}
    <Skeleton variant="text" width={300} height={40} sx={{ mb: 2 }} />
    <Skeleton variant="text" width={200} height={20} sx={{ mb: 4 }} />

    {/* Stats Cards Skeleton */}
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {[...Array(4)].map((_, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card>
            <CardContent>
              <Skeleton variant="rectangular" height={100} sx={{ borderRadius: 2 }} />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>

    {/* Charts Skeleton */}
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Skeleton variant="text" width={200} height={30} sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 1 }} />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Skeleton variant="text" width={200} height={30} sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 1 }} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Box>
);
