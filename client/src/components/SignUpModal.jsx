import { Box, Button, Modal, TextField } from "@mui/material"
import { useState } from 'react'
import axios from "axios";
import SurfingIcon from '@mui/icons-material/Surfing';
function SignUpModal({signUpModal,  handleModalClose, setLoginModal, setSignUpModal}) {
  const [formValue, setFormValue] = useState({
    username: "",
    password: '',
    email: "",
    firstName: ""

  })
  
  const handleUpdateFormChange = (prop) => (event) => {
    console.log(event.target.value)
    setFormValue({ ...formValue, [prop]: event.target.value })
  }
  const handleSignUpModal = () => {
    handleModalClose("login")
    
  }
  const handleSignUpSubmit = async () => {
    console.log("Hit!")
    await axios.post('http://localhost:2121/signup', formValue)
    setSignUpModal(false)
  }
  const handleLoginModal = () => {
    handleModalClose("signup")
    setLoginModal(true)
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
            bgcolor: 'white',
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
            <SurfingIcon
              sx={{
                fontSize: "50px",
                color: "#16C172",
              }}
            />
            <TextField
              id="outlined-basic"
              label="User Name"
              variant="outlined"
              sx={{ m: 1, width: '70%' }}
              onChange={handleUpdateFormChange('username')}
              value={formValue.username}
            />
            
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              sx={{ m: 1, width: '70%' }}
              onChange={handleUpdateFormChange('password')}
              name="password"
              value={formValue.password}
            />
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              sx={{ m: 1, width: '70%' }}
              onChange={handleUpdateFormChange('email')}
              name="email"
              value={formValue.email}
            />
            
              <TextField
                id="outlined-basic"
                label="First Name"
                variant="outlined"
                sx={{ m: 1, width: '70%' }}
                onChange={handleUpdateFormChange('firstName')}
                name="firstName"
                value={formValue.firstName}
              />
            
            <Button 
            onClick={()=>handleSignUpSubmit()}
            >
              Sign Up!
            </Button>
            <span id="signup-text">Have an account? <a id="signup-link" onClick={()=> handleLoginModal()}>Login!</a></span>
          </Box>
        </Box>

      

      </Modal>
  </div>
  )
}

export default SignUpModal;