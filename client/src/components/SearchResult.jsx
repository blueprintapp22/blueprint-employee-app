import { Card, CardContent } from "@mui/material"
import { Box } from "@mui/system"

const SearchResult = (props) => {

  return (
    <Box onClick={()=> props.GetPreview(props.path)} sx={{ display: 'flex', justifyContent: 'center', color: "white" }} >
      <Card sx={{width: "500px", margin: "10px"}}><CardContent>{props.name.toLowerCase().charAt(0).toUpperCase() + props.name.toLowerCase().slice(1)}</CardContent></Card>
    </Box>
  )
}
export default SearchResult