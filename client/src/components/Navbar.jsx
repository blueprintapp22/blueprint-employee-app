import { Box, Tab, Tabs } from "@mui/material"
import PhoneIcon from '@mui/icons-material/Phone';
import KeyIcon from '@mui/icons-material/Key';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useState } from "react";

const Navbar = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      }}>
    <Tabs value={value} onChange={handleChange} aria-label="icon label tabs example" sx={{marginTop: "30px"}}>
    <Tab icon={<PhoneIcon sx={{fontSize: "60px"}}/>} label="SALES" sx={{fontSize: "10px", color: "white"}}/>
    <Tab icon={<AccessTimeIcon sx={{fontSize: "60px"}}/>} label="CLOCKED IN" sx={{fontSize: "10px", color: "white"}} />
    <Tab icon={<KeyIcon sx={{fontSize: "60px"}}/>} label="PERMISSION" sx={{fontSize: "10px", color: "white"}} />
  </Tabs>
  </Box>
    )
}
export default Navbar