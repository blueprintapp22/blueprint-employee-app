import { useState } from 'react'
import { Box, Button,    Checkbox,    Modal, Switch, TextField, Typography} from '@mui/material'
import axios from 'axios'
import PinIcon from '@mui/icons-material/Pin';
import { useEffect } from 'react';
import { styled } from '@mui/material/styles'
const inputProps ={
  id: "input"
}
const inputLabelProps ={
  id: "input"
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
function PincodeModal({pincodeModal, setPincodeModal}) {
  const [clicked, setClicked] = useState(false)
  const [checked, setChecked] = useState(false)
  const [formValue, setFormValue] = useState({
    pinCode: ""
  })
  const handleChange  = (event) => {
    setClicked(true)
    setFormValue({ ...formValue, ["pinCode"]: event.target.value.toUpperCase() })
  }
  const handleChecked = (bool) => {
    if (bool) setChecked(true)
  }
  const getPincode = async (id) => {
    let code = await axios.get(`https://blueprint-employee-app-production.up.railway.app/bea/pincode/${id}`)
    handleChecked(code.data.pinCode.boolVal)
    setFormValue({ ...formValue, ["pinCode"]:code.data.pinCode.code})
  }
  const togglePincode = async (id) => {
    setClicked(true)
    await axios.put(`https://blueprint-employee-app-production.up.railway.app/bea/pincode/${id}`)
    
  }
  const updatePincode = async (id) => {
    await axios.put(`https://blueprint-employee-app-production.up.railway.app/bea/pincode/update/${id}`, formValue)
    closePincodeModal()
  }
  const closePincodeModal = () => {
    setPincodeModal(false)
    setClicked(false)
  }
  useEffect(()=>{
    getPincode("63448cff8d6725af9b52b8a2")
  },[])
return (
    <div>
      <Modal
        open={pincodeModal}
        onClose={() => closePincodeModal()}
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
            <PinIcon
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
              Toggle access pincode
            </Typography>
            <Switch 
            
              checked={checked}
              onChange={()=> togglePincode("63448cff8d6725af9b52b8a2")}
              onClick={checked ? ()=>setChecked(false) : ()=>setChecked(true)}
              />
              {checked ? 
                <CssTextField
                  inputProps={inputProps}
                  InputLabelProps={inputLabelProps}
                  id="outlined-basic"
                  label="Pincode"
                  variant="outlined"
                  value={formValue.pinCode}
                  onChange={handleChange}
                  
                /> 
                : null}
              <Button disabled={!clicked} onClick={()=>updatePincode("63448cff8d6725af9b52b8a2")}>
                Confirm
              </Button>
          </Box>
        </Box>
      </Modal>
    </div>
    )
  }
 

export default PincodeModal;