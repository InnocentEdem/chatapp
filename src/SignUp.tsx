import React,{useState} from 'react'
import {Card, CardContent, Paper, TextField} from '@mui/material'

function SignUp() {

  const [registrationDetails, setRegistrationDetails] = useState({
    email:"",
    password:"",
  })

  const handleUserDetails = (event: React.ChangeEvent<HTMLInputElement>)=>{
    setRegistrationDetails((prev)=>{return {...prev,[event?.target?.name]:event.target.value}})
  }


  return (
    <Paper elevation={0} square={true} 
      sx={{
        backgroundColor:"green",
        width:"100%",height:"100vh",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
        
        }}>
       <Card sx={{width:"30rem", height:"30rem"}}>
      <CardContent sx={{display:"flex",flexDirection:"column"}}>
       <TextField
        label = "Email"
        name = 'email'
        variant='outlined'
        fullWidth
        size='small'
        value = {registrationDetails?.email}
        onChange={handleUserDetails}

       />
       <TextField
        label = "Password"
        size='small'
        name = 'email'
        variant='outlined'
        value = {registrationDetails?.email}
        onChange={handleUserDetails}

       />

      </CardContent>

    </Card>
      
    </Paper>
   
  )
}

export default SignUp