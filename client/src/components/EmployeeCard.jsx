import { Card, CardActions, CardContent, Checkbox, styled} from "@mui/material"

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';


const EmployeeCard = (props) => {
  return (
  <Card p={2} sx={{boxShadow:"15", display: "flex", backgroundColor: "#707070", fontSize: "20px", justifyContent: "space-between", fontWeight: "bolder"}} raised={true}>
    <CardContent>
      {props.fullName}
      <Checkbox disabled={true} color="primary" icon={<HistoryToggleOffIcon sx={{fontSize: "30px"}}/>}checkedIcon={<AccessTimeIcon  sx={{fontSize: "30px"}}/>}/>
    </CardContent>
    <CardActions>
    
      
      <PersonRemoveIcon sx={{fontSize: "30px"}}/>
      <Checkbox icon={<VisibilityOffIcon  sx={{fontSize: "30px"}}/>}checkedIcon={<VisibilityIcon  sx={{fontSize: "30px"}}/>}/>
      
    </CardActions>
  </Card>
  )
}
export default EmployeeCard