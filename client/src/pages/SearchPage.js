import {
  AppBar,
  Button,
  CircularProgress,
  Grid,
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
  const [searchResult, setSearchResult] = useState(false)

  const [code, setCode] = useState()
  const [formValue, setFormValue] = useState({
    searchValue: '',
    codeValue: ''
  })

  const handleUpdateFormChange = (prop) => (event) => {
    setFormValue({ ...formValue, [prop]: event.target.value })
  }

  const dbx = new Dropbox({
    clientId: '90dgr7j93zv48ct',
    clientSecret: process.env.REACT_APP_SECRET,
    refreshToken: process.env.REACT_APP_REFRESH_TOKEN
  })

  const SearchDropbox = (searchQuery) => {
    setSearching(true)
    dbx
      .filesSearchV2({
        query: searchQuery
      })
      .then((res) => {
        setSearching(false)
        setSearchResult(res.result)
        setFormValue({
          searchValue: ''
        })
      })
  }
  const showMore = (cursor) => {
    setSearching(true)
    dbx.filesSearchContinueV2({ cursor: cursor }).then((res) => {
      setSearching(false)
      setSearchResult(res.result)
    })
  }
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
          console.log(
            'invoice #: ',
            blobData.getElementsByClassName('xl115')[0]?.innerHTML ||
              blobData.getElementsByClassName('xl130')[0]?.innerHTML ||
              blobData.getElementsByClassName('xl104')[1]?.innerHTML
          )
        })
        reader.readAsText(blob)

        window.open(downloadUrl)
      })
  }
  // const getPincode = async (id) => {
  //   let code = await axios.get(`https://blueprint-employee-app-production.up.railway.app/bea/pincode/${id}`)
  //   setPinBool(code.data.pinCode.boolVal)
  //   setCode(code.data.pinCode.code)
  // }
  useEffect(() => {
    // getPincode('63448cff8d6725af9b52b8a2')
  }, [])
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
          <ContactPhoneIcon sx={{ fontSize: '150px', color: 'white' }} />
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
            </Toolbar>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Button
                onClick={() => SearchDropbox(formValue.searchValue)}
                sx={{ margin: '20px', fontSize: '20px' }}
                disabled={formValue.searchValue ? false : true}
              >
                Search
              </Button>
            </Box>
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
            <Grid container>
              {searchResult.matches
                .filter(
                  (word) =>
                    !word.metadata.metadata.name
                      .toLowerCase()
                      .includes('payroll') &&
                    !word.metadata.metadata.name
                      .toLowerCase()
                      .includes('collection') &&
                    !word.metadata.metadata.name
                      .toLowerCase()
                      .includes('tbp') &&
                    !word.metadata.metadata.name
                      .toLowerCase()
                      .includes('king of the hill') &&
                    !word.metadata.metadata.name
                      .toLowerCase()
                      .includes('undersold') &&
                    !word.metadata.metadata.name
                      .toLowerCase()
                      .includes('overdue') &&
                    !word.metadata.metadata.name
                      .toLowerCase()
                      .includes('sales') &&
                    !word.metadata.metadata.name
                      .toLowerCase()
                      .includes('cancel') &&
                    !word.metadata.metadata.name
                      .toLowerCase()
                      .includes('past due') &&
                    !word.metadata.metadata.name
                      .toLowerCase()
                      .includes('schedule') &&
                    !word.metadata.metadata.name
                      .toLowerCase()
                      .includes('report') &&
                    !word.metadata.metadata.name
                      .toLowerCase()
                      .includes('client')
                )
                .map((file) => (
                  <Grid
                    item
                    xs={2}
                    sm={3}
                    md={3}
                    key={file.metadata.metadata.id}
                    sx={{ marginTop: '10px' }}
                  >
                    <SearchResult
                      GetPreview={GetPreview}
                      path={file.metadata.metadata.path_lower}
                      name={file.metadata.metadata.name}
                    />
                  </Grid>
                ))}
            </Grid>
            {searchResult.cursor ? (
              <Button onClick={() => showMore(searchResult.cursor)}>
                More?
              </Button>
            ) : null}
          </Box>
        ) : null}
      </div>
    )
  }
}

export default SearchPage
