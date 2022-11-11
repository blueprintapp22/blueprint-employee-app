import { useState } from 'react'
import { Box, Button,    Checkbox,    Modal, Switch, TextField, Typography} from '@mui/material'
import axios from 'axios'
import FactCheckIcon from '@mui/icons-material/FactCheck';
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
function QuickbooksModal({quickbooksModal, setQuickbooksModal}) {
  const [clicked, setClicked] = useState(false)
  const [custNum, setCustNum] = useState(false)
  const [invoiceData, setInvoiceData] = useState(false)
  const [checked, setChecked] = useState(false)
  const [formValue, setFormValue] = useState({
    docNum: ""
  })
  const handleChange  = (event) => {
    setClicked(true)
    setFormValue({ ...formValue, ["docNum"]: event.target.value})
  }

  const checkInvoice = async (id) => {
    let code = await axios.get(`http://localhost:3001/bea/quickbooks/business/${id}`)
    setCustNum(code)
    console.log(code)
  }
  const getData = async (id) => {
    let code = await axios.get(`http://localhost:3001/bea/quickbooks/invoice/${id}`)
    setInvoiceData(code)
    console.log(code)
  }

  const closeQuickbooksModal = () => {
    setQuickbooksModal(false)
    setClicked(false)
    setCustNum(false)
    setInvoiceData(false)
    setFormValue({ ...formValue, ["docNum"]: ""})
  }

return (
    <div>
      <Modal
        open={quickbooksModal}
        onClose={() => closeQuickbooksModal()}
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
            <FactCheckIcon
              sx={{
                color: 'white',
                fontSize: "70px",
                marginBottom: "10px"
                }}
            />
            <Typography 
              variant="h6" 
              sx={{
                color: "white"
                }}
            >
              Check invoice status
            </Typography>

          
                <CssTextField
                  inputProps={inputProps}
                  InputLabelProps={inputLabelProps}
                  id="outlined-basic"
                  label="Invoice #"
                  variant="outlined"
                  value={formValue.docNum}
                  onChange={handleChange}
                  sx={{margin: "15px"}}
                  
                /> 
                {custNum ? 
                <Button disabled={invoiceData ? true : false }onClick={()=>getData(custNum.data)}>Get data</Button>
                :
                <Button onClick={()=>checkInvoice(formValue.docNum)}>Check Invoice</Button>
                }
                {invoiceData ?
                <Box>             
                  <Typography variant="h6"  sx={{color: "white"}}>{invoiceData.data[0].CustomerRef.name}</Typography>
                  <Typography variant="h6"  sx={{color: "white"}}># of Invoices: {invoiceData.data.length}</Typography>
                </Box>
                : null}
                {invoiceData ?
                <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  textAlign: "center",
                  height: "200px",
                  overflow: "auto",
                  whiteSpace: 'nowrap',
                  
                  }}
                >             
                  {invoiceData.data.map((invoice)=>(
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      textAlign: "center",
                      margin: "15px",
                      width: "150px"

                      }}
                    >   
                    <Typography variant="h7" sx={{color: "white"}}>Date: {invoice.TxnDate}</Typography>
                    <Typography variant="h7"  sx={{color: "white"}}>Invoice #: {invoice.DocNumber} </Typography>
                    <Typography variant="h7"  sx={{color: "white"}}>Balance: {invoice.Balance}</Typography>
                    </Box>
                  ))}
                </Box>
                : null}
          </Box>
        </Box>
      </Modal>
    </div>
    )
  }
 

export default QuickbooksModal;