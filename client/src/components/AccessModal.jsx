import { useState } from 'react'
import { Box, Button,    Checkbox,    Modal, TextField, Typography} from '@mui/material'

import axios from 'axios'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


function AccessModal({accessModal, setAccessModal, employee, setEmployee}) {

  const closeAccessModal = () => {
    setAccessModal(false)
    setEmployee(null)
  }

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
            <VisibilityIcon
              sx={{
                color: '#3f51b5',
                fontSize: "50px"
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
              icon={
              <VisibilityOffIcon  
                sx={{
                  fontSize: "30px"
                  }}
                  />}
              checkedIcon={
              <VisibilityIcon  
                sx={{
                  fontSize: "30px", 
                  color:"#3f51b5"}}
                  />}
              />
          </Box>
        </Box>
      </Modal>
    </div>
    )
  }
 

export default AccessModal;