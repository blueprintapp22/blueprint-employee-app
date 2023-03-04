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
import SearchResult from '../components/SearchResult'
import { useEffect, useState } from 'react'
import { Dropbox } from 'dropbox'

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
    event.preventDefault()
    const from = (page - 1) * pageSize
    const to = (page - 1) * pageSize + pageSize

    setPagination({ ...pagination, from: from, to: to })
  }

  const handleUpdateFormChange = (prop) => (event) => {
    setFormValue({ ...formValue, [prop]: event.target.value })
  }

  //creates new dropbox instance
  const dbx = new Dropbox({
    clientId: process.env.REACT_APP_DBX_CLIENT_ID,
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
                        // GetPreview={GetPreview}
                        path={file.metadata.metadata.path_lower}
                        name={file.metadata.metadata.name}
                        dbx={dbx}
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
