import { Card, CardContent, Grid } from "@mui/material"
import FolderIcon from '@mui/icons-material/Folder';
import { Box } from "@mui/system"

const SearchResult = (props) => {

  return (
    <Grid
      item
      >
      <Grid xs={2} sm={4} md={8} item>
      <Card 
        sx={{ cursor:"pointer", width: "350px", margin: "10px", fontWeight:"bolder"}}
        onClick={()=> props.GetPreview(props.path)}
        >
          <CardContent>
          <FolderIcon sx={{marginRight: "10px"}}/> 
            {props.name.toLowerCase().charAt(0).toUpperCase() + props.name.toLowerCase().slice(1)}
          </CardContent>
      </Card>
      </Grid>

    </Grid>
  )
}
export default SearchResult