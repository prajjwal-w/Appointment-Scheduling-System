import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';



function Navigation() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
 const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };



 const handleClose = () => {
    setAnchorEl(null);
    
  };

  const userAppointment=()=>{
    navigate('/userAppointment');
  }
  const userProfile=()=>{
   navigate("/userProfile");
  }
  
  const logout=()=>{
    localStorage.clear()
    sessionStorage.clear()
    navigate('/')
  }


  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/courses"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            ASSApplication
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/rescheduleAppointment"
            sx={{
              ml: 3,
              mr: 3,
              fontSize:18,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 600,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Reschedule 
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/cancelAppointment"
            sx={{
              mr: 98,
              fontSize:18,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 600,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Cancel
          </Typography>

        
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
                <Typography
            variant="h6"
            noWrap
            component="a"
            onClose={handleClose}
            sx={{
             
              fontSize:15,
             
              
              fontWeight: 500,
             
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {localStorage.getItem("UserName")}
          </Typography>
              </IconButton>
              
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={userAppointment}>Your Appointments</MenuItem>
                <MenuItem onClick={userProfile}>My account</MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>
            </div>         
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navigation;