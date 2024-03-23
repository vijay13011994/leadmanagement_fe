import { Link, useNavigate } from 'react-router-dom'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import ChangePasswordForm from './ChangePasswordForm';
import Logo from '/se_logo.jpeg';

export default function Header() {
  const isAdmin = sessionStorage.getItem('isAdmin');
  let pages = [];
  if(isAdmin == 'true'){
    pages = [
      {name:'Dashboard', path:'dashboard'},
      {name:'Lead', path:'lead'},
      {name:'Product', path:'product'},
      {name:'User', path:'user'},
      {name:'Account', path:'account'},
      {name:'Task', path:'task/list'}
    ]
  }else{
    pages = [
      {name:'Dashboard', path:'dashboard'},
      {name:'Lead', path:'lead'},
      {name:'Product', path:'product'},
      {name:'Account', path:'account'},
      {name:'Unassigned', path:'unassigned'},
      {name:'Task', path:'task/list'}
    ]
  }
  const settings = [{label:'Change Password', trigger :()=>{
    handleCloseUserMenu()
    setOpen(true);
  }}, {label:'Logout', trigger:()=>{
    sessionStorage.clear();
    window.location.replace('/');
  }}];
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [open, setOpen] = React.useState(false);
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
    <AppBar position="static" style={{background: 'red'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img src={Logo} style={{width:'150px', height:'60px'}} className="logo" alt="Vite logo" />
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
              {pages.length >0 && pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Button
                    style={{height:'10px'}}
                    key={page.name}
                    onClick={()=>navigate(page.path)}
                    sx={{ my: 2, color: 'black', display: 'block' }}
                  >
                    {page.name}
              </Button>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', textDecoration:'none' } }}>
            {pages.length >0  && pages.map((page) => (
              <Button
                key={page.name}
                onClick={()=>navigate(page.path)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                <MenuItem key={setting} onClick={setting.trigger}>
                  <Typography textAlign="center">{setting.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      <ChangePasswordForm open={open} setOpen={setOpen} getAllProducts={null}/>
    </AppBar>
  )
}
