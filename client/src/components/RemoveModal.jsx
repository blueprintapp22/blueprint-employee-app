import { useState } from 'react'
import { Box, Button,  IconButton,  InputAdornment,  Modal, Typography} from '@mui/material'
import WarningIcon from '@mui/icons-material/Warning';


function RemoveModal({removeModal, setRemoveModal}) {
  const [confirmed, setConfirmed] = useState(false)
  const closeRemoveModal = () => {
    setConfirmed(false)
    setRemoveModal(false)
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
              Are you sure you want to permanantly remove?
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
      onClose={() => setRemoveModal(false)}
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
            Are you sure you want to permanantly remove?
          </Typography>
          <Typography 
            variant="h12" 
            sx={{
              color: "lightgray"
              }}
          >
            <em>(This action cannot be undone)</em>
          </Typography>

        </Box>
      </Box>
    </Modal>
  </div>
  )
}

export default RemoveModal;