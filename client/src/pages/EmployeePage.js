import { useEffect, useState } from 'react'
import axios from 'axios'
import GroupsIcon from '@mui/icons-material/Groups'
import { Box, CircularProgress } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2' // Grid version 2
import EmployeeCard from '../components/EmployeeCard'

const EmployeePage = () => {
  const [employeeData, setEmployeeData] = useState()
  const [removeModal, setRemoveModal] = useState(false)
  const [accessModal, setAccessModal] = useState(false)
  const [reload, setReload] = useState(false)

  const getEmployees = async () => {
    let res = await axios.get('http://localhost:3001/bea/users')
    setEmployeeData(res.data.user)
  }

  useEffect(() => {
    getEmployees()
  }, [removeModal, accessModal])

  if (employeeData) {
    return (
      <div>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
          }}
        >
          <GroupsIcon sx={{ fontSize: '200px', color: 'white' }} />
          <Grid
            container
            spacing={{ xs: 3, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 16 }}
          >
            {employeeData.map((user, index) => (
              <Grid xs={2} sm={4} md={8} key={index}>
                <EmployeeCard
                  fullName={user.fullName}
                  userName={user.userName}
                  setRemoveModal={setRemoveModal}
                  access={user.access}
                  removeModal={removeModal}
                  employeeData={employeeData}
                  accessModal={accessModal}
                  setAccessModal={setAccessModal}
                  reload={reload}
                  setReload={setReload}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
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
