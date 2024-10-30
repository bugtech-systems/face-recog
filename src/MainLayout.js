import * as React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Dashboard from './pages/Dashboard/Dashboard';
import RecordsManager from './pages/Database/RecordsManager';
import Checkout from 'pages/NewRecord/Checkout';
import UserManagement from 'pages/Authentication/UserManagement';
import Navigation from 'components/Navigation';
import ImageManagement from 'pages/Storage/ImageManagement';
import { Dialog } from '@mui/material';
import Slide from '@mui/material/Slide';
import ImageCapture from 'pages/Scanners/ImageCapture';
import { useDispatch, useSelector } from 'react-redux';
import { closeScannerModal, getUiScannerModal, openScannerModal } from 'features/dashboard/uiSlice';
import { getDataProfiles, setProfilesData } from 'features/dashboard/dataSlice';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

let theme = createTheme({
    palette: {
        primary: {
            light: '#63ccff',
            main: '#009be5',
            dark: '#006db3',
        },
    },
    typography: {
        h5: {
            fontWeight: 500,
            fontSize: 26,
            letterSpacing: 0.5,
        },
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiTab: {
            defaultProps: {
                disableRipple: true,
            },
        },
    },
    mixins: {
        toolbar: {
            minHeight: 48,
        },
    },
});

theme = {
    ...theme,
    components: {
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#081627',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                },
                contained: {
                    boxShadow: 'none',
                    '&:active': {
                        boxShadow: 'none',
                    },
                },
            },
        },
        MuiTabs: {
            styleOverrides: {
                root: {
                    marginLeft: theme.spacing(1),
                },
                indicator: {
                    height: 3,
                    borderTopLeftRadius: 3,
                    borderTopRightRadius: 3,
                    backgroundColor: theme.palette.common.white,
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    margin: '0 16px',
                    minWidth: 0,
                    padding: 0,
                    [theme.breakpoints.up('md')]: {
                        padding: 0,
                        minWidth: 0,
                    },
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    padding: theme.spacing(1),
                },
            },
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    borderRadius: 4,
                },
            },
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgb(255,255,255,0.15)',
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    '&.Mui-selected': {
                        color: '#4fc3f7',
                    },
                },
            },
        },
        MuiListItemText: {
            styleOverrides: {
                primary: {
                    fontSize: 14,
                    fontWeight: theme.typography.fontWeightMedium,
                },
            },
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    color: 'inherit',
                    minWidth: 'auto',
                    marginRight: theme.spacing(2),
                    '& svg': {
                        fontSize: 20,
                    },
                },
            },
        },
        MuiAvatar: {
            styleOverrides: {
                root: {
                    width: 32,
                    height: 32,
                },
            },
        },
    },
};

const drawerWidth = 256;

export default function MainLayout() {
    const scannerModal = useSelector(getUiScannerModal);
    const dispatch = useDispatch();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    
    const handleClose = () => {
        dispatch(closeScannerModal())
    }
    
    const handleGetProfiles = () => {
            dispatch(getDataProfiles())
            .then(({payload}) => {
            console.log('PAYLOADS', payload)
                if(payload && payload.length !== 0){
                    dispatch(setProfilesData(payload))
                }
            })
    }

    React.useEffect(() => {
        handleGetProfiles();
    }, [])
    
    
    console.log(scannerModal, 'modal')
    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', maxWidth: '100vw' }}>
        
           <ImageCapture imageType={scannerModal}/>
          <CssBaseline />
          
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            >
                {isSmUp ? null : (
                    <Navigation
                        PaperProps={{ style: { width: drawerWidth } }}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}

                    />
                )}
                <Navigation
                    PaperProps={{ style: { width: drawerWidth } }}
                    sx={{ display: { sm: 'block', xs: 'none' } }}
                />
            </Box>



            <Routes>
                <Route path="/" exact element={
                    <Dashboard drawerWidth={drawerWidth} isSmUp={isSmUp} handleDrawerToggle={handleDrawerToggle} />
                } />
                <Route path="/records" exact element={
                    <RecordsManager drawerWidth={drawerWidth} isSmUp={isSmUp} handleDrawerToggle={handleDrawerToggle} />
                } />
                <Route path="/new-record" exact element={
                    <Checkout drawerWidth={drawerWidth} isSmUp={isSmUp} handleDrawerToggle={handleDrawerToggle} />
                } />
                <Route path="/authentication" exact element={
                    <UserManagement drawerWidth={drawerWidth} isSmUp={isSmUp} handleDrawerToggle={handleDrawerToggle} />
                } />

                <Route path="/storage" exact element={
                    <ImageManagement drawerWidth={drawerWidth} isSmUp={isSmUp} handleDrawerToggle={handleDrawerToggle} />
                } />
              
            </Routes>
        </Box>
    );
}