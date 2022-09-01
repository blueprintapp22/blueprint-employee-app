import { Card, CardActions, CardContent, Checkbox, styled} from "@mui/material"

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';



const EmployeeCard = (props) => {
  
  return (
  <Card p={2} sx={{boxShadow:"15", display: "flex", backgroundColor: "#707070", fontSize: "20px", justifyContent: "space-between", fontWeight: "bolder"}} raised={true}>
    <CardContent className="font">
      {props.fullName}
      <Checkbox disabled={false}  icon={<HistoryToggleOffIcon sx={{fontSize: "30px"}}/>}checkedIcon={<AccessTimeIcon  sx={{fontSize: "30px", color:"#3f51b5"}}/>}/>
    </CardContent>
    <CardActions>
    
      
      <PersonRemoveIcon 
        className="remove" 
        sx={{
          fontSize: "30px", 
          color: "white", 
          cursor: "pointer",
          '&:hover': {
            color: '#f44336',
            opacity: [0.9, 0.8, 0.7],
          },
        }} 
        onClick={()=>props.setRemoveModal(true)}/>
      <Checkbox icon={<VisibilityOffIcon  sx={{fontSize: "30px"}}/>}checkedIcon={<VisibilityIcon  sx={{fontSize: "30px", color:"#3f51b5"}}/>}/>
      
    </CardActions>
  </Card>
  )
}
export default EmployeeCard