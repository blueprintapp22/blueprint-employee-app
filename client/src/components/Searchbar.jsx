import * as React from 'react'
import { useState } from 'react'
import { styled, alpha } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputBase from '@mui/material/InputBase'
import logo from '../images/bplogo.png'
import LoginModal from './LoginModal'
import SignUpModal from './SignUpModal'
import { Button } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import { useNavigate } from 'react-router-dom'
import GroupsIcon from '@mui/icons-material/Groups'
import PinIcon from '@mui/icons-material/Pin'
import PincodeModal from './PincodeModal'
import QuickbooksModal from './QuickbooksModal'
import FactCheckIcon from '@mui/icons-material/FactCheck'
import axios from 'axios'
import { BASE_URL } from '../services/api'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginLeft: 0,
  width: '100%',

  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto'
  }
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}))

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
        width: '20ch'
      }
    }
  }
}))

export default function SearchAppBar(props) {
  const [loginModal, setLoginModal] = useState(false)
  const [logoutModal, setLogoutModal] = useState(false)
  const [signUpModal, setSignUpModal] = useState(false)
  const [pincodeModal, setPincodeModal] = useState(false)
  const [quickbooksModal, setQuickbooksModal] = useState(false)
  let navigate = useNavigate()

  const handleModalClose = (modal) => {
    switch (modal) {
      case 'login':
        setLoginModal(false)
        break
      case 'logout':
        setLogoutModal(false)
        break
      default:
        setSignUpModal(false)
        break
    }
  }
const refreshToken = async () => {
  try {
    await axios.get(`${BASE_URL}/bea/quickbooks/refresh`)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data)
    } else {
      console.error('Unexpected error:', error)
    }
  }
}
  // const handleQuickbooksModal = async () => {
  //   refreshToken()
  //   setQuickbooksModal(true)
  // }

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="transparent" sx={{ boxShadow: '10' }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={() => navigate('/')}
              sx={{ mr: 2 }}
            >
              <img src={logo} id="search-logo" alt="search logo" />
            </IconButton>
            <Typography
              variant="h5"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              {props.authenticated ? (
                <div id="welcome-text">
                  Welcome {props.user.fullName}!{' '}
                  <LogoutIcon
                    onClick={props.handleLogOut}
                    sx={{
                      color: 'white',
                      fontSize: '30px',
                      marginTop: '3px',
                      marginLeft: '10px',
                      cursor: 'pointer',
                      '&:hover': {
                        opacity: '0.5',
                        transform: 'translateY(2px)'
                      }
                    }}
                  />
                </div>
              ) : (
                <Button
                  onClick={() => setLoginModal(true)}
                  sx={{ color: 'white', fontSize: '20px' }}
                >
                  Login
                </Button>
              )}
            </Typography>
            {props.authenticated && props.user.access ? (
              <div>
                <FactCheckIcon
                  sx={{
                    fontSize: '45px',
                    color: 'white',
                    cursor: 'pointer',
                    marginRight: '10px',
                    '&:hover': { color: '#3f51b5', opacity: [0.9, 0.8, 0.7] }
                  }}
                  onClick={() => handleQuickbooksModal()}
                />
              </div>
            ) : (
              <div></div>
            )}
            {props.authenticated && props.user.admin ? (
              <div>
                <GroupsIcon
                  sx={{
                    fontSize: '45px',
                    color: 'white',
                    cursor: 'pointer',
                    '&:hover': { color: '#3f51b5', opacity: [0.9, 0.8, 0.7] }
                  }}
                  onClick={() => navigate('/employees')}
                />
                {/* <PinIcon
                  sx={{
                    fontSize: '45px',
                    color: 'white',
                    cursor: 'pointer',
                    marginLeft: '10px',
                    '&:hover': { color: '#3f51b5', opacity: [0.9, 0.8, 0.7] }
                  }}
                  onClick={() => setPincodeModal(true)}
                /> */}
              </div>
            ) : (
              <div></div>
            )}
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
      {/* <PincodeModal
        pincodeModal={pincodeModal}
        setPincodeModal={setPincodeModal}
      /> */}
      {/* <QuickbooksModal
        quickbooksModal={quickbooksModal}
        setQuickbooksModal={setQuickbooksModal}
      /> */}
    </div>
  )
}
