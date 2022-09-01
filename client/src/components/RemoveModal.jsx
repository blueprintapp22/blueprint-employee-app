import { useState } from 'react'
import { Box, Button,  IconButton,  InputAdornment,  Modal, TextField, Typography} from '@mui/material'
import WarningIcon from '@mui/icons-material/Warning';
import { styled } from '@mui/material/styles';
import { useEffect } from 'react';
import axios from 'axios'
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
      borderColor: '#f44336',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#f44336',
    },
  },
});

function RemoveModal({removeModal, setRemoveModal, employee, setEmployee, setReload}) {
  const [confirmed, setConfirmed] = useState(false)
  const [formValue, setFormValue] = useState({
    userName: "",
  })
  const closeRemoveModal = () => {
    setConfirmed(false)
    setRemoveModal(false)
    setEmployee(null)
    setReload(true)
    setReload(false)
  }
  const handleUpdateFormChange = (prop) => (event) => {
    console.log(event.target.value)
    setFormValue({ ...formValue, [prop]: event.target.value })
  }
  const deleteUser = async (id) => {
    closeRemoveModal()
    await axios.delete(`http://localhost:3001/auth/user/${id}`)
    
  }
  if (!confirmed){
    return (
    <div>
      <Modal
        open={removeModal}
        onClose={() => closeRemoveModal()}
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
            sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            textAlign: "center"
            }}
          >
            <WarningIcon
              sx={{
                color: '#f44336',
                fontSize: "50px"
                }}
            />
            <Typography 
              variant="h6" 
              sx={{
                color: "white"
                }}
            >
              {`Are you sure you want to permanantly remove ${employee}?`}
            </Typography>
            <Typography 
              variant="h12" 
              sx={{
                color: "lightgray"
                }}
            >
              <em>(This action cannot be undone)</em>
            </Typography>
            <Button 
              onClick={()=>setConfirmed(true)}
              sx={{
                marginTop: "20px"
              }}
              >
              Continue
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
    )
  }
  else return (
    <div>
    <Modal
      open={removeModal}
      onClose={() => closeRemoveModal()}
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
          sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          textAlign: "center"
          }}
        >
          <WarningIcon
            sx={{
              color: '#f44336',
              fontSize: "50px"
              }}
          />
          <Typography 
            variant="h6" 
            sx={{
              color: "white"
              }}
          >
            Type in and match the username exactly to confirm.
          </Typography>
          <Typography 
            variant="h12" 
            sx={{
              color: "lightgray"
              }}
          >
            <em>(Clicking confirm will permanantly remove the user)</em>
          </Typography>
          <Typography 
            variant="h5"
            sx={{
            color: '#f44336'
          }}
          >
            {employee}
          </Typography>
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
             <Button 
              onClick={() => deleteUser(employee)}
              sx={{
                marginTop: "20px"
              }}
              disabled={formValue.userName === employee ? false : true}
              >
              CONFIRM
            </Button>
        </Box>
      </Box>
    </Modal>
  </div>
  )
}

export default RemoveModal;