import React from 'react'
import Header from './Header';
import { Box, Grid, Paper } from '@mui/material';
import EnhancedTable from '../../components/EnhancedTable';


export default function RecordsManager({ handleDrawerToggle }) {
    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <Header onDrawerToggle={handleDrawerToggle} />
            <Box component="main" sx={{ width: '100%', flex: 1, py: 3, px: 2, bgcolor: '#eaeff1' }}>

                <EnhancedTable />
            </Box>
        </Box >
    )
}
