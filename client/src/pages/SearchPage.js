import {
  AppBar,
  Button,
  Checkbox,
  CircularProgress,
  TextField,
  Toolbar,
  Typography
} from '@mui/material'
import { Box } from '@mui/system'
import { styled } from '@mui/material/styles'
import ContactPhoneIcon from '@mui/icons-material/ContactPhone'
import { SearchDropbox, GetPreview } from '../services/dropbox'
import SearchResult from '../components/SearchResult'
import { useState } from 'react'
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
const SearchPage = () => {
  const [searching, setSearching] = useState(false)
  const [searchResult, setSearchResult] = useState(false)
  const dbx = new Dropbox({
    accessToken: process.env.REACT_APP_DBX_TOKEN
  })

  const SearchDropbox = (searchQuery) => {
    setSearching(true)
    dbx
      .filesSearchV2({
        query: searchQuery
      })
      .then((res) => {
        setSearching(false)
        setSearchResult(res.result.matches)
        console.log(res.result.matches)
      })
  }
  const GetPreview = (filePath) => {
    console.log('Hit')
    dbx
      .filesGetPreview({
        path: filePath
      })
      .then((res) => {
        let downloadUrl = URL.createObjectURL(res.result.fileBlob)
        window.open(downloadUrl)
      })
  }
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
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <CssTextField
              id="outlined-basic"
              label="Business Name"
              inputProps={inputProps}
              InputLabelProps={inputLabelProps}
              variant="outlined"
            />
            <CssTextField
              id="outlined-basic"
              label="Salesman"
              inputProps={inputProps}
              InputLabelProps={inputLabelProps}
              variant="outlined"
            />
            <CssTextField
              id="outlined-basic"
              label="Location"
              inputProps={inputProps}
              InputLabelProps={inputLabelProps}
              variant="outlined"
            />
            <CssTextField
              id="outlined-basic"
              label="Date"
              inputProps={inputProps}
              InputLabelProps={inputLabelProps}
              variant="outlined"
            />
          </Toolbar>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Button
              onClick={() => SearchDropbox('Jeff Levar')}
              sx={{ margin: '20px', fontSize: '20px' }}
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
      {searchResult
        ? searchResult.map((file) => (
            <div key={file.metadata.metadata.id}>
              <SearchResult
                GetPreview={GetPreview}
                path={file.metadata.metadata.path_lower}
                name={file.metadata.metadata.name}
              />
            </div>
          ))
        : null}
    </div>
  )
}
export default SearchPage
