import { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Checkbox,
  Modal,
  Switch,
  TextField,
  Typography
} from '@mui/material'
import axios from 'axios'
import FactCheckIcon from '@mui/icons-material/FactCheck'
import { styled } from '@mui/material/styles'
import { BASE_URL } from '../services/api'

const inputProps = {
  id: 'input'
}
const inputLabelProps = {
  id: 'input'
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
function QuickbooksModal({ quickbooksModal, setQuickbooksModal }) {
  const [clicked, setClicked] = useState(false)
  const [custNum, setCustNum] = useState(false)
  const [invoiceData, setInvoiceData] = useState(false)
  const [invoiceInputError, setInvoiceInputError] = useState(false)
  const [noInvoice, setNoInvoice] = useState(false)
  const [formValue, setFormValue] = useState({
    docNum: ''
  })

  useEffect(() => {
    setInvoiceInputError(false)
    setNoInvoice(false)
  }, [quickbooksModal])

  const handleChange = (event) => {
    setClicked(true)
    setFormValue({ ...formValue, ['docNum']: event.target.value })
  }

const refreshToken = async () => {
  try {
    await axios.get(`${BASE_URL}/bea/quickbooks/refresh`)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data)
    } else {
      console.error('Unexpected error:', error)
    }
  }
}
  const checkInvoice = async (id) => {
    let reg = /[a-zA-Z]+/g
    if (
      formValue.docNum.length > 4 &&
      formValue.docNum.length <= 6 &&
      !reg.test(formValue.docNum)
    ) {
      setNoInvoice(false)
      setTimeout(invoiceError, 5000)
      setInvoiceInputError(false)
      let code = await axios.get(`${BASE_URL}/bea/quickbooks/business/${id}`)
      setCustNum(code)
    } else {
      setInvoiceInputError(true)
    }
  }

  const invoiceError = () => {
    if (!custNum) {
      setNoInvoice(true)
    }
  }
  const getData = async (id) => {
    let code = await axios.get(`${BASE_URL}/bea/quickbooks/invoice/${id}`)
    setInvoiceData(code)
  }

  // const closeQuickbooksModal = () => {
  //   refreshToken()
  //   setQuickbooksModal(false)
  //   setClicked(false)
  //   setCustNum(false)
  //   setInvoiceData(false)
  //   setFormValue({ ...formValue, ['docNum']: '' })
  // }

  return (
    <div>
      <Modal
        open={quickbooksModal}
        // onClose={() => closeQuickbooksModal()}
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
              textAlign: 'center'
            }}
          >
            <FactCheckIcon
              sx={{
                color: 'white',
                fontSize: '70px',
                marginBottom: '10px'
              }}
            />
            <Typography
              variant="h6"
              sx={{
                color: 'white'
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
              sx={{ margin: '15px' }}
              error={invoiceInputError}
              helperText="Invoice must be at least 5 digits"
            />
            {custNum ? (
              <Button
                disabled={invoiceData ? true : false}
                onClick={() => getData(custNum.data)}
              >
                Get data
              </Button>
            ) : (
              <Button onClick={() => checkInvoice(formValue.docNum)}>
                Check Invoice
              </Button>
            )}
            {noInvoice ? (
              <p style={{ color: 'red' }}>Invoice not found</p>
            ) : null}
            {invoiceData ? (
              <Box>
                <Typography variant="h6" sx={{ color: 'white' }}>
                  {invoiceData.data[0].CustomerRef.name}
                </Typography>
                <Typography variant="h6" sx={{ color: 'white' }}>
                  # of Invoices: {invoiceData.data.length}
                </Typography>
              </Box>
            ) : null}
            {invoiceData ? (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  textAlign: 'center',
                  height: '200px',
                  overflow: 'auto',
                  whiteSpace: 'nowrap'
                }}
              >
                {invoiceData.data.map((invoice) => (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      textAlign: 'center',
                      margin: '15px',
                      width: '150px'
                    }}
                  >
                    <Typography variant="h7" sx={{ color: 'white' }}>
                      Date: {invoice.TxnDate}
                    </Typography>
                    <Typography variant="h7" sx={{ color: 'white' }}>
                      Invoice #: {invoice.DocNumber}{' '}
                    </Typography>
                    <Typography variant="h7" sx={{ color: 'white' }}>
                      Balance: {invoice.Balance}
                    </Typography>
                  </Box>
                ))}
              </Box>
            ) : null}
          </Box>
        </Box>
      </Modal>
    </div>
  )
}

export default QuickbooksModal
