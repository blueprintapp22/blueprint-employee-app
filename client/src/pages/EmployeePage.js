import { useEffect, useState } from 'react'
import GroupsIcon from '@mui/icons-material/Groups'
import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Unstable_Grid2' // Grid version 2
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}))
const EmployeePage = () => {
  const [employeeData, setEmployeeData] = useState()
  useEffect(() => {}, [])
  if (!employeeData) {
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
          {Array.from(Array(10)).map((_, index) => (
            <Grid xs={2} sm={4} md={8} key={index}>
              <Item>xs=2</Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    )
  }
}
export default EmployeePage
