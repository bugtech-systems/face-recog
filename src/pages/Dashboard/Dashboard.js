import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chart from '../../components/Chart'
import Deposits from '../../components/Voters';
import Header from './Header';
import { Box } from '@mui/material';
import moment from 'moment';
import CopyRight from 'components/CopyRight';
import { useSelector } from 'react-redux';
import { getProfiles } from 'features/dashboard/dataSlice';


export default function Dashboard({ handleDrawerToggle }) {
  const profilesData = useSelector(getProfiles);


  return (
    <>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header onDrawerToggle={handleDrawerToggle} />
        <Box component="main" sx={{ flex: 1, py: 3, px: 2, bgcolor: '#eaeff1' }}>
          <Grid container spacing={3}>
            {/* Chart */}
            {/* Recent Deposits */}
            <Grid item xs={12} md={6} lg={6}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 180,
                }}
              >
                <Deposits
                  title="Total Records"
                  total={profilesData.length}
                // date={moment()}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 180,
                }}
              >
                <Deposits
                  title="Total Active"
                  total="0"
                  date={moment()}
                />
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12} >
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 240,
                }}
              >
                <Chart />
              </Paper>
            </Grid>
          </Grid>
        </Box>
        <br/>
        <CopyRight/>
      </Box>
    </>
  )
}
