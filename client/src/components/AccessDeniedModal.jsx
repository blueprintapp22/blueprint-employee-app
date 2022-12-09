
import { Box,   Modal,  Typography} from '@mui/material'
import WarningIcon from '@mui/icons-material/Warning';



function AccessDeniedModal({accessDeniedModal, setAccessDeniedModal}) {

    return (
    <div>
      <Modal
        open={accessDeniedModal}
        onClose={() => setAccessDeniedModal(false)}
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
                color: "lightgrey"
                }}
            >
              <em>{`Access from admin is required to use finder`}</em>
            </Typography>


          </Box>
        </Box>
      </Modal>
    </div>
    )
  
}

export default AccessDeniedModal;