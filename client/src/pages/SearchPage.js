import {
  AppBar,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  Toolbar,
  Typography
} from '@mui/material'
import { Box } from '@mui/system'
import { styled, alpha } from '@mui/material/styles'
import ContactPhoneIcon from '@mui/icons-material/ContactPhone'
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
        <ContactPhoneIcon sx={{ fontSize: '200px', color: 'white' }} />
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
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Show last current invoice"
              />
            </FormGroup>
          </Box>
        </AppBar>
      </Box>
    </div>
  )
}
export default SearchPage
