import {
  AppBar,
  Button,
  CircularProgress,
  Grid,
  Pagination,
  TextField,
  Toolbar,
  Typography
} from '@mui/material'
import { Box } from '@mui/system'
import { styled } from '@mui/material/styles'
import ContactPhoneIcon from '@mui/icons-material/ContactPhone'
import SearchResult from '../components/SearchResult'
import { useEffect, useState } from 'react'
import { Dropbox } from 'dropbox'
import { checkQuickbooksInvoice } from '../services/quickbooks'
import axios from 'axios'
import { BASE_URL } from '../services/api'

let reader = new FileReader()
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
const SearchPage = ({ authenticated, user }) => {
  const [searching, setSearching] = useState(false)
  const [searchResult, setSearchResult] = useState([])
  const [pageSize, setPageSize] = useState(12)
  const [pagination, setPagination] = useState({
    count: 20,
    from: 0,
    to: pageSize
  })
  const [pageSheets, setPageSheets] = useState([])
  const [invoiceNumber, setInvoiceNumber] = useState()
  const [invoiceData, setInvoiceData] = useState([])
  const [allPaid, setAllPaid] = useState()
  const [code, setCode] = useState()
  const [formValue, setFormValue] = useState({
    searchValue: '',
    codeValue: ''
  })

  //handles pagination
  useEffect(() => {
    if (searchResult) {
      setPageSheets(searchResult.slice(pagination.from, pagination.to))
    }
  }, [pagination.from, pagination.to, searchResult])

  //handles the page change for pagination
  const handlePageChange = (event, page) => {
    const from = (page - 1) * pageSize
    const to = (page - 1) * pageSize + pageSize

    setPagination({ ...pagination, from: from, to: to })
  }

  //handles the quickbooks functionality when an invoice is clicked
  useEffect(() => {
    if (invoiceNumber) {
      getBusiness(invoiceNumber)
    }
  }, [invoiceNumber])

  //Takes invoice number and then searches for business ID, then uses that business ID to return all invoices from business
  const getBusiness = async (invoiceNumber) => {
    let reg = /[a-zA-Z]+/g
    try {
      if (!reg.test(invoiceNumber)) {
        let res = await axios.get(
          `${BASE_URL}/bea/quickbooks/business/${invoiceNumber}`
        )
        if (res.data) {
          let invoiceData = await axios.get(
            `${BASE_URL}/bea/quickbooks/invoice/${res.data}`
          )
          setInvoiceData(invoiceData.data)
        } else {
          setInvoiceData('No data found')
        }
      }
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    if (invoiceData) {
      checkInvoiceBalance(invoiceData)
    }
    console.log('allpaid: ', allPaid)
  }, [invoiceData])
  //Takes invoice data and determines if there is a balance sum
  const checkInvoiceBalance = async (invoices) => {
    let sum = invoices.forEach((invoice) => {
      sum = parseInt(invoice.Balance) + sum
      console.log('sum: ', sum)
    })
    if (sum === 0) {
      await setAllPaid(true)
    } else {
      await setAllPaid(false)
    }
  }

  const handleUpdateFormChange = (prop) => (event) => {
    setFormValue({ ...formValue, [prop]: event.target.value })
  }

  //creates new dropbox instance
  const dbx = new Dropbox({
    clientId: '90dgr7j93zv48ct',
    clientSecret: process.env.REACT_APP_SECRET,
    refreshToken: process.env.REACT_APP_REFRESH_TOKEN
  })

  //search dropbox for any file where the name matches the search query.
  const SearchDropbox = (searchQuery) => {
    setSearching(true)
    dbx
      .filesSearchV2({
        query: searchQuery,
        options: {
          max_results: 1000,
          filename_only: true
        }
      })
      .then((res) => {
        setSearchResult(
          res.result.matches.filter(
            (word) =>
              !word.metadata.metadata.name.toLowerCase().includes('payroll') &&
              !word.metadata.metadata.name
                .toLowerCase()
                .includes('collection') &&
              !word.metadata.metadata.name.toLowerCase().includes('tbp') &&
              !word.metadata.metadata.name
                .toLowerCase()
                .includes('king of the hill') &&
              !word.metadata.metadata.name
                .toLowerCase()
                .includes('undersold') &&
              !word.metadata.metadata.name.toLowerCase().includes('overdue') &&
              !word.metadata.metadata.name.toLowerCase().includes('sales') &&
              !word.metadata.metadata.name.toLowerCase().includes('cancel') &&
              !word.metadata.metadata.name.toLowerCase().includes('past due') &&
              !word.metadata.metadata.name.toLowerCase().includes('schedule') &&
              !word.metadata.metadata.name.toLowerCase().includes('report') &&
              !word.metadata.metadata.name.toLowerCase().includes('client')
          )
        )

        setSearching(false)
        setFormValue({
          searchValue: ''
        })
      })
  }

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
          // console.log(decodeURIComponent(atob(reader.result)))
          let blobData = parser.parseFromString(reader.result, 'text/html')
          setInvoiceNumber(
            blobData.getElementsByClassName('xl115')[0]?.innerHTML ||
              blobData.getElementsByClassName('xl132')[0]?.innerHTML ||
              blobData.getElementsByClassName('xl130')[0]?.innerHTML ||
              blobData.getElementsByClassName('xl104')[1]?.innerHTML ||
              'No invoice # found'
          )
        })
        reader.readAsText(blob)

        window.open(downloadUrl)
      })
  }

  //*Below code to be used in future update

  // const getPincode = async (id) => {
  //   let code = await axios.get(`https://blueprint-employee-app-production.up.railway.app/bea/pincode/${id}`)
  //   setPinBool(code.data.pinCode.boolVal)
  //   setCode(code.data.pinCode.code)
  // }

  // useEffect(() => {
  //   // getPincode('63448cff8d6725af9b52b8a2')
  // }, [])

  //*End future update code

  if (authenticated && user.access) {
    return (
      <div>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
          }}
        >
          <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
            Invoice Finder
          </Typography>

          <Typography
            variant="h6"
            sx={{ color: 'lightgray', fontWeight: 'bold', textAlign: 'center' }}
          >
            <em>Search past sales invoices by specific details</em>
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar
            position="static"
            sx={{
              boxShadow: '10',
              color: 'white',
              display: 'flex',
              flexDirection: 'space-around'
            }}
            color="transparent"
          >
            <Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>
              <CssTextField
                id="outlined-basic"
                label="Search by keyword..."
                inputProps={inputProps}
                InputLabelProps={inputLabelProps}
                variant="outlined"
                onChange={handleUpdateFormChange('searchValue')}
                name="searchValue"
                value={formValue.searchValue}
                sx={{ width: '800px' }}
              />
              <Button
                onClick={() => SearchDropbox(formValue.searchValue)}
                sx={{ margin: '20px', fontSize: '20px' }}
                disabled={formValue.searchValue ? false : true}
                variant="contained"
              >
                Search
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
        {searching ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <CircularProgress />
          </Box>
        ) : null}
        {searchResult ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Grid
              container
              columnSpacing={2}
              rowSpacing={0}
              justifyContent="center"
              alignItems="center"
              sx={{ marginBlock: '2vh' }}
            >
              {pageSheets
                ? pageSheets.map((file) => (
                    <Grid
                      item
                      xs="auto"
                      sm="auto"
                      md="auto"
                      lg="auto"
                      key={file.metadata.metadata.id}
                    >
                      <SearchResult
                        GetPreview={GetPreview}
                        path={file.metadata.metadata.path_lower}
                        name={file.metadata.metadata.name}
                      />
                    </Grid>
                  ))
                : null}
            </Grid>
            <Box sx={{ color: 'white' }}>
              {searchResult.length > 0 ? (
                <Pagination
                  count={Math.ceil(searchResult.length / pageSize)}
                  onChange={handlePageChange}
                  color="primary"
                  size="large"
                  sx={{
                    background: 'white',
                    borderRadius: '10px',
                    marginBlock: '1vh',
                    padding: '10px'
                  }}
                />
              ) : null}
            </Box>
          </Box>
        ) : null}
      </div>
    )
  }
}

export default SearchPage
