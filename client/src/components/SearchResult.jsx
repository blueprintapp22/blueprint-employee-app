import { Card, CardContent, Grid } from '@mui/material'
import FolderIcon from '@mui/icons-material/Folder'
import { Box } from '@mui/system'

const SearchResult = (props) => {
  return (
    <Grid xs="auto" sm="auto" md="auto" item>
      <Card
        sx={{
          cursor: 'pointer',
          width: '350px',
          height: '75px',
          margin: '10px',
          fontWeight: 'bolder',
          fontSize: '1rem'
        }}
        onClick={() => props.GetPreview(props.path)}
      >
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'row',

            alignItems: 'center'
          }}
        >
          <FolderIcon sx={{ marginRight: '10px' }} />

          {props.name.toLowerCase().charAt(0).toUpperCase() +
            props.name.toLowerCase().slice(1)}
        </CardContent>
      </Card>
    </Grid>
  )
}
export default SearchResult
