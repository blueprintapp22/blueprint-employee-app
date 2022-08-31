import { useState } from 'react'
import { SignInUser } from '../services/Auth'
import { Box, Button,  IconButton,  InputAdornment,  Modal,  TextField } from '@mui/material'
import logo from '../images/bplogo.png'
import { styled, alpha } from '@mui/material/styles';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
const inputProps = {
  id: "input"
}
const inputLabelProps ={
  id: "input"
}
const CssTextField = styled(TextField)({

  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white',
    },
    '&:hover fieldset': {
      borderColor: '#3f51b5',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#3f51b5',
    },
  },
});
function LoginModal({loginModal, handleModalClose, setSignUpModal, setLoginModal, user, setUser, toggleAuthenticated}) {
  const [formValue, setFormValue] = useState({
    userName: "",
    password: '',
  })
  const [showPassword, toggleShowPassword] = useState(false)
  
  
  
  const handleUpdateFormChange = (prop) => (event) => {
    console.log(event.target.value)
    setFormValue({ ...formValue, [prop]: event.target.value })
  }
  const handleSignUpModal = () => {
    handleModalClose("login")
    setSignUpModal(true)
  }
  const handleLoginSubmit = async () => {
    const payload = await SignInUser(formValue)
    setUser(payload)
    toggleAuthenticated(true)
    setLoginModal(false)
    
  }
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  }
  return (
    <div>
      <Modal
        open={loginModal}
        onClose={() => handleModalClose("login")}
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
          <img src={logo} id="login-logo"/>
          <CssTextField
            id="outlined-basic"
            label="Username"
            inputProps={inputProps}
            InputLabelProps={inputLabelProps}
            variant="outlined"
            sx={{ m: 1, width: '70%' }}
            onChange={handleUpdateFormChange('userName')}
            value={formValue.email}
          />
          
            <CssTextField
              id="outlined-basic"
              label="Password"
              inputProps={inputProps}
              InputLabelProps={inputLabelProps}
              variant="outlined"
              sx={{ m: 1, width: '70%' }}
              type={showPassword ? "text" : "password"}
              onChange={handleUpdateFormChange('password')}
              value={formValue.password}
              InputProps={{
                endAdornment:
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={()=> toggleShowPassword(!showPassword)}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              }
            />

          
          <Button
            onClick={()=>handleLoginSubmit()}
            >
            Login
          </Button>
          <span id="signup-text">Dont have an account? <a id="signup-link" 
          onClick={()=> handleSignUpModal(true)}
          >
            Sign up!</a></span>
        </Box>
      </Box>
    </Modal>
    
  </div>
  );
}

export default LoginModal;