import { Card, CardContent } from '@mui/material'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../services/api'

const SearchResult = (props) => {
  const [invoiceNumber, setInvoiceNumber] = useState()
  const [invoiceData, setInvoiceData] = useState([])
  const [backgroundColor, setBackgroundColor] = useState('white')
  const [invoiceError, setInvoiceError] = useState()

  let reader = new FileReader()
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

  //handles the quickbooks functionality when an invoice is clicked
  // useEffect(() => {
  //   if (invoiceNumber) {
  //     if (invoiceNumber !== 'No invoice # found') {
  //       getBusiness(invoiceNumber)
  //     } else {
  //       setInvoiceError(invoiceNumber)
  //       setBackgroundColor('yellow')
  //     }
  //   }
  // }, [invoiceNumber])

  //checks for balance on returned invoices and sets allPaid to true or false
  // useEffect(() => {
  //   let balance = -1

  //   if (invoiceData.length > 0) {
  //     if (invoiceData !== 'Cancelled') {
  //       balance = checkInvoiceBalance(invoiceData)
  //       if (balance === 0) {
  //         setBackgroundColor('green')
  //       } else {
  //         setBackgroundColor('red')
  //         setInvoiceError('Open')
  //       }
  //     } else {
  //       setInvoiceError('Cancelled')
  //       setBackgroundColor('red')
  //     }
  //   }
  // }, [invoiceData])

  //generates html blob of the chosen invoice. This will also set the invoice number based on a specific class in the html.
  const getPreview = () => {
    props.dbx
      .filesGetPreview({
        path: props.path
      })
      .then((res) => {
        let downloadUrl = URL.createObjectURL(res.result.fileBlob)
        let parser = new DOMParser()
        let blob = res.result.fileBlob
        reader.addEventListener('loadend', function () {
          let blobData = parser.parseFromString(reader.result, 'text/html')

          let reg = /(\D)/g

          //This will determine where to grab the invoice number from. As new edge cases are found, this is where we can fix.
          switch (true) {
            case !reg.test(
              blobData.getElementsByClassName('xl97')[0]?.innerHTML
            ) && blobData.getElementsByClassName('xl97')[0].innerHTML !== '':
              setInvoiceNumber(
                blobData.getElementsByClassName('xl97')[0]?.innerHTML
              )
              break
            case !reg.test(
              blobData.getElementsByClassName('xl98')[0]?.innerHTML
            ):
              setInvoiceNumber(
                blobData.getElementsByClassName('xl98')[0]?.innerHTML
              )
              break
            case !reg.test(
              blobData.getElementsByClassName('xl99')[0]?.innerHTML
            ):
              setInvoiceNumber(
                blobData.getElementsByClassName('xl99')[0]?.innerHTML
              )
              break
            case !reg.test(
              blobData.getElementsByClassName('xl102')[0]?.innerHTML
            ):
              setInvoiceNumber(
                blobData.getElementsByClassName('xl102')[0]?.innerHTML
              )
              break

            default:
              setInvoiceNumber(null)
              break
          }
        })
        reader.readAsText(blob)
        window.open(downloadUrl)
      })
  }

  //Takes invoice number and then searches for business ID, then uses that business ID to return all invoices from business
  const getBusiness = async (invoiceNumber) => {
    if (process.env.NODE_ENV === 'production') {
      refreshToken()
    }

    try {
      let res = await axios.get(
        `${BASE_URL}/bea/quickbooks/business/${invoiceNumber}`
      )

      if (res.data !== "No invoice's found") {
        let invoiceData = await axios.get(
          `${BASE_URL}/bea/quickbooks/invoice/${res.data}`
        )
        setInvoiceData(invoiceData.data)
      } else {
        setInvoiceData('Cancelled')
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
    })
    return sum
  }

  return (
    <Card
      sx={{
        cursor: 'pointer',
        width: '350px',
        height: '80px',
        margin: '10px',
        fontWeight: 'bolder',
        fontSize: '1rem',
        backgroundColor: `${backgroundColor}`
      }}
      onClick={getPreview}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',

          alignItems: 'center'
        }}
      >
        <p>
          {props.name.toLowerCase().charAt(0).toUpperCase() +
            props.name.toLowerCase().slice(1)}
        </p>
        {invoiceError ? <p>{invoiceError}</p> : null}
      </CardContent>
    </Card>
  )
}
export default SearchResult
