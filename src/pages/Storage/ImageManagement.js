import React from 'react'
import Header from './Header';
import { Box, Grid, Paper } from '@mui/material';
import CopyRight from 'components/CopyRight';
import ImageDataList from './ImageDataList';


export default function ImageManagement({ handleDrawerToggle }) {
    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <Header onDrawerToggle={handleDrawerToggle} />
            <Box component="main" sx={{ width: '100%', flex: 1, py: 3, px: 2, bgcolor: '#eaeff1' }}>
                <ImageDataList />
            </Box>
            <CopyRight sx={{ mt: 8, mb: 4 }} />

        </Box >
    )
}
