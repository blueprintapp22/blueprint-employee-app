import { Card, CardActions, CardContent, Checkbox, styled} from "@mui/material"

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import RemoveModal from "./RemoveModal";
import { useEffect, useState } from "react";
import AccessModal from "./AccessModal";



const EmployeeCard = (props) => {
  const [employee, setEmployee] = useState(null)
  const openRemoveModal = (employee) => {
    props.setRemoveModal(true)
    console.log(employee)
    setEmployee(employee)
  }
  useEffect(()=>{

  },[employee])
  return (
    <div>
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
        onClick={()=>openRemoveModal(props.userName)}/>
      <Checkbox icon={<VisibilityOffIcon  sx={{fontSize: "30px"}}/>}checkedIcon={<VisibilityIcon  sx={{fontSize: "30px", color:"#3f51b5"}}/>}/>
      
    </CardActions>
  </Card>
    <div>
        {employee ?  
          <RemoveModal
            removeModal={props.removeModal}
            setRemoveModal={props.setRemoveModal}
            fullName={props.fullName}
            userName={props.userName}
            employeeData={props.employeeData}
            employee={employee}
            setEmployee={setEmployee}
          />
          :
          <div></div>
          }
        {employee ?  
          <AccessModal
            accessModal={props.accessModal}
            setRemoveModal={props.setAccessModal}
            fullName={props.fullName}
            userName={props.userName}
            employeeData={props.employeeData}
            employee={employee}
            setEmployee={setEmployee}
          />
          :
          <div></div>
          }
    </div>
  </div>
  )
}
export default EmployeeCard