import { Card, CardContent } from "@mui/material"
import FolderIcon from '@mui/icons-material/Folder';
import { Box } from "@mui/system"

const SearchResult = (props) => {

  return (
    <Box 
      sx={{ display: 'flex', justifyContent: 'center', color: "white" }} >
      
      <Card 
        sx={{ cursor:"pointer", width: "350px", margin: "10px", fontWeight:"bolder"}}
        onClick={()=> props.GetPreview(props.path)}
        >
          <CardContent>
          <FolderIcon sx={{marginRight: "10px"}}/> 
            {props.name.toLowerCase().charAt(0).toUpperCase() + props.name.toLowerCase().slice(1)}
          </CardContent>
      </Card>

    </Box>
  )
}
export default SearchResult