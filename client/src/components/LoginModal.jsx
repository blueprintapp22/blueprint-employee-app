import { useState, useEffect } from 'react'
import { SignInUser } from '../services/Auth'
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Modal,
  TextField
} from '@mui/material'
import logo from '../images/bplogo.png'
import { styled } from '@mui/material/styles'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Visibility from '@mui/icons-material/Visibility'
import { BASE_URL } from '../services/api'

const inputProps = {
  id: 'input'
}
const inputLabelProps = {
  id: 'input'
}
const CssTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white'
    },
    '&:hover fieldset': {
      borderColor: '#3f51b5'
    },
    '&.Mui-focused fieldset': {
      borderColor: '#3f51b5'
    }
  }
})
function LoginModal({
  loginModal,
  handleModalClose,
  setSignUpModal,
  setLoginModal,
  user,
  setUser,
  toggleAuthenticated
}) {
  const [formValue, setFormValue] = useState({
    userName: '',
    password: ''
  })
  const [showPassword, toggleShowPassword] = useState(false)
  const [showError, toggleShowError] = useState(false)

  useEffect(() => {
    toggleShowError(false)
  }, [loginModal])

  const handleUpdateFormChange = (prop) => (event) => {
    setFormValue({ ...formValue, [prop]: event.target.value })
  }
  const handleSignUpModal = () => {
    handleModalClose('login')
    setSignUpModal(true)
  }
  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    const payload = await SignInUser(formValue)

    if (payload === 'Unauthorized') {
      toggleShowError(true)
      setFormValue({
        userName: '',
        password: ''
      })
    } else {
      setUser(payload)
      toggleAuthenticated(true)
      toggleShowError(false)
      setFormValue({
        userName: '',
        password: ''
      })
      setLoginModal(false)

      window.location.replace(`${BASE_URL}bea/quickbooks`)
    }
  }
  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }
  return (
    <div>
      <Modal
        open={loginModal}
        onClose={() => handleModalClose('login')}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: '#282c34',
            boxShadow: 24,
            p: 4
          }}
        >
          <Box
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 1,
              width: '100%',
              justifyContent: 'space-around',
              alignItems: 'center'
            }}
            noValidate
            autoComplete="off"
          >
            <img src={logo} id="login-logo" alt="logo" />
            <CssTextField
              id="outlined-basic"
              label="Username"
              inputProps={inputProps}
              InputLabelProps={inputLabelProps}
              variant="outlined"
              sx={{ m: 1, width: '70%' }}
              onChange={handleUpdateFormChange('userName')}
              value={formValue.userName}
            />

            <CssTextField
              id="outlined-basic"
              label="Password"
              inputProps={inputProps}
              InputLabelProps={inputLabelProps}
              variant="outlined"
              sx={{ m: 1, width: '70%' }}
              type={showPassword ? 'text' : 'password'}
              onChange={handleUpdateFormChange('password')}
              value={formValue.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => toggleShowPassword(!showPassword)}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            {showError ? (
              <p style={{ color: 'red' }}>Incorrect user name or password</p>
            ) : null}
            <Button
              disabled={!formValue.userName || !formValue.password}
              onClick={(e) => handleLoginSubmit(e)}
            >
              Login
            </Button>
            <span id="signup-text" className="font">
              Dont have an account?{' '}
              <Button id="signup-link" onClick={() => handleSignUpModal(true)}>
                Sign up!
              </Button>
            </span>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}

export default LoginModal
