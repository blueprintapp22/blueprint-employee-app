import { useState } from 'react'
import axios from 'axios';
import { Box, Button,  Modal,  TextField } from '@mui/material'
import WavesIcon from "@mui/icons-material/Waves";
function LoginModal({loginModal, handleModalClose,setSignUpModal, setLoginModal, user, setUser}) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: '',
  })
  
  
  
  const handleUpdateFormChange = (prop) => (event) => {
    console.log(event.target.value)
    setFormValue({ ...formValue, [prop]: event.target.value })
  }
  const handleSignUpModal = () => {
    handleModalClose("login")
    setSignUpModal(true)
  }
  const handleLoginSubmit = async () => {
    console.log("Hit!")
    let res = await axios.post('http://localhost:2121/login', formValue)
    setUser(res.data)
    setLoginModal(false)
    
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
          <WavesIcon
              sx={{
                fontSize: "50px",
                color: "#16C172",
              }}
            />
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            sx={{ m: 1, width: '70%' }}
            onChange={handleUpdateFormChange('email')}
            value={formValue.email}
          />
          
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              sx={{ m: 1, width: '70%' }}
              onChange={handleUpdateFormChange('password')}
              value={formValue.password}
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