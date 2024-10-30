import * as React from 'react';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import PermMediaOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActual';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 'Build',
    children: [
      { id: 'Database', icon: <DnsRoundedIcon />, path: "records" },
      {
        id: 'Authentication',
        path: "authentication",
        icon: <PeopleIcon />,
        active: true,
      },
      { id: 'Storage', icon: <PermMediaOutlinedIcon />, path: "storage" },
      /*  { id: 'Hosting', icon: <PublicIcon /> },
       { id: 'Functions', icon: <SettingsEthernetIcon /> },
       {
         id: 'Machine learning',
         icon: <SettingsInputComponentIcon />,
       }, */
    ],
  }

];

const item = {
  py: '2px',
  px: 3,
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover, &:focus': {
    bgcolor: 'rgba(255, 255, 255, 0.08)',
  },
};

const itemCategory = {
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 1.5,
  px: 3,
};

export default function Navigator(props) {
  const [activeNav, setActiveNav] = React.useState('Dashboard')
  const { ...other } = props;

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff' }}>
          VMS
        </ListItem>
        <ListItem selected={activeNav === 'Dashboard' ? true : false} sx={{ ...item, ...itemCategory }} onClick={() => setActiveNav('Dashboard')} component={Link} to="/dashboard">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText>Project Overview</ListItemText>

        </ListItem>
        {categories.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: '#101F33' }}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, active, path }) => (
              <ListItem disablePadding key={childId} selected={activeNav === childId ? true : false} component={Link} to={path} onClick={() => setActiveNav(childId)}>
                <ListItemButton sx={item}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText>{childId}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
      </List>
    </Drawer>
  );
}