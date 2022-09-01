import * as React from 'react';
import { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import logo from '../images/bplogo.png'
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import { Button } from '@mui/material';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchAppBar(props) {
  const [loginModal, setLoginModal] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);
  

  const handleModalClose = (modal) => {
    switch (modal) {
      case "login":
        setLoginModal(false);
        break;
      case "logout":
        setLogoutModal(false);
      default:
        setSignUpModal(false);
        break;
    }
  };
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="transparent" sx={{boxShadow: "10"}}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <img src={logo} id="search-logo"/>
            </IconButton>
            <Typography
              variant="h5"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              {props.authenticated ? <div onClick={props.handleLogOut}>Welcome {props.user.userName}!</div> : <Button onClick={()=>setLoginModal(true)} sx={{color: "white", fontSize:"20px"}}>Login</Button>}
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon sx={{fontSize: "35px", color: "white"}} />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search invoices…"
                inputProps={{ 'aria-label': 'search' }}
                sx={{fontSize:"20px"}}
              />
            </Search>
          </Toolbar>
        </AppBar>
      </Box>
      <LoginModal 
        loginModal={loginModal}
        handleModalClose={handleModalClose}
        signUpModal={signUpModal}
        setSignUpModal={setSignUpModal}
        setLoginModal={setLoginModal}
        user={props.user}
        setUser={props.setUser}
        toggleAuthenticated={props.toggleAuthenticated}
      />
      <SignUpModal
        signUpModal={signUpModal}
        handleModalClose={handleModalClose}
        setLoginModal={setLoginModal}
        setSignUpModal={setSignUpModal}
        />
    </div>
  );
}
