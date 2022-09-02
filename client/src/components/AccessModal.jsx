import { useState } from 'react'
import { Box, Button,    Checkbox,    Modal, TextField, Typography} from '@mui/material'
import axios from 'axios'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import KeyIcon from '@mui/icons-material/Key';
import { useEffect } from 'react';

function AccessModal({accessModal, setAccessModal, employee, setEmployee, setReload, access}) {
  const [clicked, setClicked] = useState(false)
  const [checked, setChecked] = useState(false)
  const closeAccessModal = () => {
    setAccessModal(false)
    setEmployee(null)
    setReload(true)
    setReload(false)
    setClicked(false)
  }
  const toggleAccess = async (id) => {
    setClicked(true)
    setReload(true)
    setReload(false)
    await axios.put(`http://localhost:3001/auth/user/access/${id}`)
    
  }
  const handleChecked = () => {
    if (access) setChecked(true)
  }
  useEffect(()=>{
    handleChecked()
  },[])
return (
    <div>
      <Modal
        open={accessModal}
        onClose={() => closeAccessModal()}
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
            <KeyIcon
              sx={{
                color: 'white',
                fontSize: "70px"
                }}
            />
            <Typography 
              variant="h6" 
              sx={{
                color: "white"
                }}
            >
              {`Give search access to ${employee}?`}
            </Typography>
            <Checkbox 
              checked={checked}
              onChange={()=> toggleAccess(employee)}
              icon={<VisibilityOffIcon  sx={{fontSize: "30px"}}/>}
              checkedIcon={<VisibilityIcon  
              sx={{fontSize: "30px", color:"#3f51b5"}}/>}
              onClick={checked ? ()=>setChecked(false) : ()=>setChecked(true)}
              />
              <Button disabled={!clicked} onClick={()=>closeAccessModal()}>
                Confirm
              </Button>
          </Box>
        </Box>
      </Modal>
    </div>
    )
  }
 

export default AccessModal;