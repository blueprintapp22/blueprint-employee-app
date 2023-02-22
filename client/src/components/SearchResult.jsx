import { Card, CardContent, Grid } from '@mui/material'
import FolderIcon from '@mui/icons-material/Folder'
import { Dropbox } from 'dropbox'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../services/api'
import { Box } from '@mui/system'

let reader = new FileReader()

const SearchResult = (props) => {
  const [invoiceNumber, setInvoiceNumber] = useState()
  const [invoiceData, setInvoiceData] = useState([])
  const [totalSum, setTotalSum] = useState(-1)
  const [allPaid, setAllPaid] = useState()
  const [backgroundColor, setBackgroundColor] = useState('white')
  const [invoiceError, setInvoiceError] = useState()

  //handles the quickbooks functionality when an invoice is clicked
  useEffect(() => {
    if (invoiceNumber !== 'No invoice # found') {
      getBusiness(invoiceNumber)
    } else {
      setInvoiceError(invoiceNumber)
    }
  }, [invoiceNumber])

  //checks for balance on returned invoices and sets allPaid to true or false
  useEffect(() => {
    setTotalSum(-1)
    if (invoiceData) {
      if (invoiceData !== 'No invoice found') {
        checkInvoiceBalance(invoiceData)
      } else {
        setInvoiceError(invoiceData)
      }
    }
  }, [invoiceData])

  //creates new dropbox instance
  const dbx = new Dropbox({
    clientId: '90dgr7j93zv48ct',
    clientSecret: process.env.REACT_APP_SECRET,
    refreshToken: process.env.REACT_APP_REFRESH_TOKEN
  })

  //generates html blob of the chosen invoice. This will also set the invoice number based on a specific class in the html. This needs to be continuously updated, as there are multiple formats of invoices, and the number is not always in the same div and class.
  const GetPreview = (filePath) => {
    dbx
      .filesGetPreview({
        path: filePath
      })
      .then((res) => {
        let downloadUrl = URL.createObjectURL(res.result.fileBlob)
        let parser = new DOMParser()
        let blob = res.result.fileBlob
        reader.addEventListener('loadend', function () {
          let blobData = parser.parseFromString(reader.result, 'text/html')
          setInvoiceNumber(
            // blobData.getElementsByClassName('xl115')[0]?.innerHTML ||
            //   blobData.getElementsByClassName('xl132')[0]?.innerHTML ||
            //   blobData.getElementsByClassName('xl130')[0]?.innerHTML ||
            //   blobData.getElementsByClassName('xl104')[2]?.innerHTML ||
            //   blobData.getElementsByClassName('xl106')[2]?.innerHTML ||
            blobData.getElementsByClassName('xl98')[0]?.innerHTML ||
              'No invoice # found'
          )
        })
        reader.readAsText(blob)

        window.open(downloadUrl)
      })
  }

  //Takes invoice number and then searches for business ID, then uses that business ID to return all invoices from business
  const getBusiness = async (invoiceNumber) => {
    let reg = /[a-zA-Z]+/g
    try {
      if (!reg.test(invoiceNumber)) {
        let res = await axios.get(
          `${BASE_URL}/bea/quickbooks/business/${invoiceNumber}`
        )
        console.log('get business: ', res)
        if (res.data !== 'No invoice found') {
          let invoiceData = await axios.get(
            `${BASE_URL}/bea/quickbooks/invoice/${res.data}`
          )
          setInvoiceData(invoiceData.data)
        } else {
          setInvoiceData('No invoice found')
        }
      }
    } catch (error) {
      throw error
    }
  }

  //Takes invoice data and determines if there is a balance sum
  const checkInvoiceBalance = (invoices) => {
    let sum = 0
    invoices.forEach((invoice) => {
      sum = parseInt(invoice.Balance) + sum
      console.log('sum: ', sum)
    })
    setTotalSum(sum)
    if (totalSum === 0) {
      setAllPaid(true)
      setBackgroundColor('green')
    } else if (totalSum > 0) {
      setAllPaid(false)
      setBackgroundColor('red')
    }
  }

  return (
    <Grid xs="auto" sm="auto" md="auto" item>
      <Card
        sx={{
          cursor: 'pointer',
          width: '350px',
          height: '75px',
          margin: '10px',
          fontWeight: 'bolder',
          fontSize: '1rem',
          backgroundColor: `${backgroundColor}`
        }}
        onClick={() => GetPreview(props.path)}
      >
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'row',

            alignItems: 'center'
          }}
        >
          <FolderIcon sx={{ marginRight: '10px' }} />

          <p>
            {props.name.toLowerCase().charAt(0).toUpperCase() +
              props.name.toLowerCase().slice(1)}
          </p>
          {invoiceError ? <p>{invoiceError}</p> : null}
        </CardContent>
      </Card>
    </Grid>
  )
}
export default SearchResult
