import { Outlet } from "react-router-dom";
import LinearProgress from '@mui/material/LinearProgress';
import { useState, useEffect } from "react";
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Navbar from "../navbar";
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MailIcon from '@mui/icons-material/Mail';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SideMenuItem from "./sidemenu_item";
import InventoryIcon from '@mui/icons-material/Inventory';
import AddBoxIcon from '@mui/icons-material/AddBox';
import PersonIcon from '@mui/icons-material/Person';
import PaidIcon from '@mui/icons-material/Paid';
import { UserService } from "../../services/user_service";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
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

function Layout() {

    const location = useLocation();
    const [progress, setProgress] = useState(false);
    const [roles, setRoles] = useState<string[]>([]);

    useEffect(() => {

        UserService.getUserRoles().then(res => {
            setRoles(res.data);
        }).catch(err => {
            console.log(err);
        })

        const requestInterceptor = axios.interceptors.request.use((config) => {
            setProgress(true);
            return config;
        });

        const responseInterceptor = axios.interceptors.response.use((response) => {
            setProgress(false);
            return response;
        }, (error) => {
            setProgress(false);
            return Promise.reject(error);
        });

        return () => {
            axios.interceptors.request.eject(requestInterceptor);
            axios.interceptors.response.eject(responseInterceptor);
        };
    }, []);

    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <>
            {progress && <LinearProgress color="primary" sx={{ zIndex: 999999 }} />}
            {
                location.pathname === '/unauthorized'
                    ? <Outlet />
                    : location.pathname.startsWith('/admin')
                        ?
                        <div>
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
                                                marginRight: 5,
                                                ...(open && { display: 'none' }),
                                            }}
                                        >
                                            <MenuIcon />
                                        </IconButton>
                                        <Typography variant="h6" noWrap component="div">
                                            Fish Firm - Admin Panel
                                        </Typography>
                                    </Toolbar>
                                </AppBar>
                                <Drawer variant="permanent" open={open}>
                                    <DrawerHeader>
                                        <IconButton onClick={handleDrawerClose}>
                                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                                        </IconButton>
                                    </DrawerHeader>
                                    <Divider />
                                    {
                                        (roles.includes('owner') || roles.includes('admin')) &&
                                        <List>
                                            <SideMenuItem text="Dashboard" target="/admin" open={open} icon={<DashboardIcon />} />
                                            <SideMenuItem text="New Orders" target="/admin/new-orders" open={open} icon={<MailIcon />} />
                                            <SideMenuItem text="Active Orders" target="/admin/active-orders" open={open} icon={<InventoryIcon />} />
                                            <SideMenuItem text="Shipped Orders" target="/admin/shipped-orders" open={open} icon={<LocalShippingIcon />} />
                                        </List>
                                    }
                                    <Divider />
                                    {
                                        roles.includes('owner') &&
                                        <List>
                                            <SideMenuItem text="Sales" target="/admin/sales" open={open} icon={<PaidIcon />} />
                                        </List>
                                    }
                                    <Divider />
                                    {
                                        (roles.includes('owner') || roles.includes('admin')) &&
                                        <List>
                                            <SideMenuItem text="Products" target="/admin/products" open={open} icon={<AddBoxIcon />} />
                                        </List>
                                    }
                                    <Divider />
                                    {
                                        (roles.includes('owner') || roles.includes('admin') || roles.includes('receptionist')) &&
                                        <List>
                                            <SideMenuItem text="Employees" target="/admin/employees" open={open} icon={<PersonIcon />} />
                                        </List>
                                    }
                                </Drawer>
                                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                                    <DrawerHeader />
                                    <Outlet />
                                </Box>
                            </Box>
                        </div>
                        :
                        <div>
                            {!(['/login', '/register'].includes(location.pathname)) && <Navbar />}
                            <Outlet />
                        </div>}
        </>
    )
}

export default Layout;