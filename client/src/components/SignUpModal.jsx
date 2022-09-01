import { Box, Button,  IconButton,  InputAdornment,  Modal, TextField } from "@mui/material"
import { useState } from 'react'
import { styled } from '@mui/material/styles';
import { RegisterUser } from "../services/Auth"
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
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
function SignUpModal({signUpModal,  handleModalClose, setLoginModal, setSignUpModal}) {
  const [showPassword, toggleShowPassword] = useState(false)
  const [showConfirmPassword, toggleShowConfirmPassword] = useState(false)
  const [formValue, setFormValue] = useState({
    userName: "",
    password: '',
    confirmPassword: "",
    email: "",
    fullName: "",
    access: false

  })
  
  const handleUpdateFormChange = (prop) => (event) => {
    console.log(event.target.value)
    setFormValue({ ...formValue, [prop]: event.target.value })
  }
  const handleSignUpModal = () => {
    handleModalClose("login")
    
  }

  const handleSignUpSubmit = async () => {
    await RegisterUser({
      userName: formValue.userName,
      email: formValue.email,
      password: formValue.password,
      fullName: formValue.fullName,
      access: false
    })
    setFormValue({
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
      fullName: ''
    })
    setSignUpModal(false)
  }
  const handleLoginModal = () => {
    handleModalClose("signup")
    setLoginModal(true)
  }
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  }
 
  return (
  <div>
    <Modal
        open={signUpModal}
        onClose={() => handleModalClose("signUp")}
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
            <PersonAddIcon
              sx={{
                fontSize: "50px",
                color: "white",
              }}
            />
            <CssTextField
              id="outlined-basic"
              className="modal-field"
              label="User Name"
              variant="outlined"
              inputProps={inputProps}
              InputLabelProps={inputLabelProps}
              sx={{ m: 1, width: '70%', color: "white", input: {color: "white"} }}
              
              onChange={handleUpdateFormChange('userName')}
              value={formValue.userName}
            />
            
            <CssTextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              inputProps={inputProps}
              InputLabelProps={inputLabelProps}     
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
              sx={{ m: 1, width: '70%' }}
              onChange={handleUpdateFormChange('password')}
              name="password"
              value={formValue.password}

            />
           <CssTextField
              id="outlined-basic"
              label="Confirm Password"
              variant="outlined"
              type={showConfirmPassword ? "text" : "password"}
              inputProps={inputProps}
              InputLabelProps={inputLabelProps}   
              InputProps={{
                endAdornment:
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={()=> toggleShowConfirmPassword(!showConfirmPassword)}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              }            
              sx={{ m: 1, width: '70%' }}
              onChange={handleUpdateFormChange('confirmPassword')}
              name="password"
              value={formValue.confirmPassword}
            />
            <CssTextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              inputProps={inputProps}
              InputLabelProps={inputLabelProps}           
              sx={{ m: 1, width: '70%' }}
              onChange={handleUpdateFormChange('email')}
              name="email"
              value={formValue.email}
            />
            
              <CssTextField
                id="outlined-basic"
                label="First/Last Name"
                variant="outlined"
                InputProps={inputProps}
                InputLabelProps={inputLabelProps}              
                sx={{ m: 1, width: '70%' }}
                onChange={handleUpdateFormChange('fullName')}
                name="fullName"
                value={formValue.fullName}
              />
            
            <Button 
            onClick={()=>handleSignUpSubmit()}
            >
              Sign Up!
            </Button>
            <span className="font" id="signup-text">Have an account? <a id="signup-link" onClick={()=> handleLoginModal()}>Login!</a></span>
          </Box>
        </Box>

      

      </Modal>
  </div>
  )
}

export default SignUpModal;