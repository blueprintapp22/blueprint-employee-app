import { useEffect, useState } from 'react'
import axios from 'axios'
import GroupsIcon from '@mui/icons-material/Groups'
import { styled } from '@mui/material/styles'
import { Box, CircularProgress } from '@mui/material'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Unstable_Grid2' // Grid version 2
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#707070',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: 'white',
  fontSize: '25px'
}))
const EmployeePage = () => {
  const [employeeData, setEmployeeData] = useState()
  const getEmployees = async () => {
    let res = await axios.get('http://localhost:3001/bea/users')
    setEmployeeData(res.data.user)
  }
  useEffect(() => {
    getEmployees()
  }, [])
  if (employeeData) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column'
        }}
      >
        <GroupsIcon sx={{ fontSize: '200px' }} />
        <Grid
          container
          spacing={{ xs: 3, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 16 }}
        >
          {employeeData.map((user, index) => (
            <Grid xs={2} sm={4} md={8} key={index}>
              <Item elevation={24}>{user.fullName}</Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    )
  } else
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column'
        }}
      >
        <GroupsIcon sx={{ fontSize: '200px' }} />
        <CircularProgress />
      </Box>
    )
}
export default EmployeePage
