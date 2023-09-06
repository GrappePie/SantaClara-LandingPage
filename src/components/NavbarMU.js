import * as React from 'react';
import Image from "next/image";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Link from "next/link";
import {AccountCircle} from "@mui/icons-material";

const pages = [{id:1, name:'Ecovillage', url:'/santaclara/ecovillage'},{ id:2, name:'Playaviva', url:'/santaclara/playaviva'},{ id:3, name:'Ubicaciones', url:'/santaclara/ubicaciones'},{ id:4, name:'Ver Disponibilidad', url:'/cita/registro'}, { id:5, name:'Descargar Brochure', url:'https://github.com/GrappePie/SantaClara-LandingPage/raw/main/public/BROCHURE%20HD%20-%20SANTA%20CLARA%20ECOVILLAGE.pdf'}];
const settings = [{id:1, name:'Logout', url:'/api/auth/logout'}];

function ResponsiveAppBar({myRef,hidden,handleLogout}) {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static" color="default">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <Grid container alignItems="center">
                            <Grid item xs={5}>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenNavMenu}
                                    color="inherit"
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorElNav}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    open={Boolean(anchorElNav)}
                                    onClose={handleCloseNavMenu}
                                    sx={{
                                        display: { xs: 'block', md: 'none' },
                                    }}
                                >
                                    {pages.map((page) => (
                                        <MenuItem key={page.id} onClick={handleCloseNavMenu}>
                                            <Link href={page.url}>
                                                <Typography textAlign="center">{page.name}</Typography>
                                            </Link>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Grid>
                            <Grid item xs={6} container justify="center">
                                <Link href={'/'}>
                                    <Image src="/logo.webp" alt="logo" width="100" height="20"/>
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Grid container alignItems="center">
                            <Grid item xs={5}>
                                <Link href={'/'}>
                                    <Image src="/logo.webp" alt="logo" width="200" height="40"/>
                                </Link>
                            </Grid>
                            <Grid item xs={7}>
                                {pages.map((page) => (
                                    <Link href={page.url} key={page.id}>
                                        <Button color="inherit">
                                            <Typography textAlign="center">{page.name}</Typography>
                                        </Button>
                                    </Link>
                                ))}
                            </Grid>
                        </Grid>
                    </Box>
                    {hidden ? null : (
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <AccountCircle />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting.id} onClick={handleCloseUserMenu}>
                                    {setting.name === 'Logout' ? <Button color="inherit" onClick={handleLogout}><Typography textAlign="center">{setting.name}</Typography></Button> : null}
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;
