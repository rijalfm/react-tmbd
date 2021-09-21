import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import HomePage from '../../Pages/Home/Home';
import FormPage from '../../Pages/Form/Form';
import { Switch, Route, Link as RouterLink, BrowserRouter, useLocation } from "react-router-dom";
// import { Typography } from '@mui/material';

// List item with link
const path = [
  {
    label: "Beranda",
    to: "/",
    icon: (<HomeRoundedIcon color="primary" />),
  },
  {
    label: "Tambah Data",
    to: "/tambah-data",
    icon: (<AddCircleRoundedIcon color="primary" />),
  },
]

const drawerWidth = 240;

// Drawer Opened Class
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

// Drawer Closed Class
const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: 0,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(7)} + 1px)`,
  },
});

// Styled Drawer Header Element
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

function ListItemLink(props) {
  const { icon, primary, to } = props;
  const location = useLocation();

  const renderLink = React.useMemo(
    () =>
      React.forwardRef(function Link(itemProps, ref) {
        return <RouterLink to={to} ref={ref} {...itemProps} role={undefined} />;
      }),
    [to],
  );

  return (
    <li>
      <ListItem  button selected={location.pathname === to} component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

export default function AppDrawer(props) {
  const theme = useTheme();
  const [data, setData] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const toggleDark = props.toggleDark;

  const editData = (formData) => {
    const index = data.findIndex(d => d.id === formData.id);
    const newData = [...data];
    newData[index] = formData;
    setData(newData);
  }

  const deleteData = (listIndex) => {
    let newData = [...data];
    console.log(newData);
    listIndex.forEach((index) => {
      newData = newData.filter((data) => data.id !== index);
    })
    console.log(newData);
    setData(newData.filter(data => data))
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }}>
            {/* <Typography variant="h6" noWrap component="div">
              Mini variant drawer
            </Typography> */}
          </Box>
          <div style={{ paddingRight:0 }}>{toggleDark}</div>
        </Toolbar>
      </AppBar>
      <BrowserRouter>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {path.map((data,index) => (
              <ListItemLink 
                key={index}
                primary={data.label}
                to={data.to}
                icon={data.icon}
              />
            ))}
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, pt: 2.5, pr: 3, pl: 3, overflow: "hidden" }}>
          <DrawerHeader />
          <Switch>
            <Route exact path="/" render={() => <HomePage deleteData={deleteData} editData={editData} data={data} setData={setData} />} />
            <Route path="/tambah-data" render={() => <FormPage />} />
          </Switch>
        </Box>
      </BrowserRouter>
    </Box>
  );
}
