import axios from "axios";
import { useState,useEffect } from "react";
import {Box,Table,TableBody,TableCell,TableContainer,
    TableHead,TableRow,Typography} from '@mui/material';
import {purple,blue} from '@mui/material/colors';
import Navigation from "./Navigation";
function UserAppointents(){
    const [appointments, setAppointment]=useState([])

    async function getAllAppointments(){
        const appoint = await axios.get(`http://localhost:39930/api/Appointment/GetAllAppointmentUser?userName=${localStorage.getItem("user")}`,{'headers':{'Authorization': 'Bearer ' + localStorage.getItem("token")}})
        
        console.log(appoint.status)
        console.log(appoint.data)
        setAppointment(appoint.data)
        console.log(appointments)
    }
    useEffect(()=>{
        getAllAppointments()
    })
    return(
        <>
        <Navigation/> 
            <Box textAlign='center' sx={{backgroundColor:purple[600],color:'white'}}>
                <Typography variant='h3'>Appointment</Typography>
            </Box>
            <Box align="center">
            </Box>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                        <TableCell align='center' style={{fontWeight:'bold',fontSize:18,backgroundColor:blue[500],color:'white'}}>No</TableCell>
                            <TableCell align='center' style={{fontWeight:'bold',fontSize:18,backgroundColor:blue[500],color:'white'}}>User Id</TableCell>
                            <TableCell align='center' style={{fontWeight:'bold',fontSize:18,backgroundColor:blue[500],color:'white'}}>Course</TableCell>
                            <TableCell align='center' style={{fontWeight:'bold',fontSize:18,backgroundColor:blue[500],color:'white'}}>Slot</TableCell>
                            <TableCell align='center' style={{fontWeight:'bold',fontSize:18,backgroundColor:blue[500],color:'white'}}>Date</TableCell>
                            <TableCell align='center' style={{fontWeight:'bold',fontSize:18,backgroundColor:blue[500],color:'white'}}>Reschedule Date</TableCell>
                            <TableCell align='center' style={{fontWeight:'bold',fontSize:18,backgroundColor:blue[500],color:'white'}}>Reschedule Slot</TableCell>
                            <TableCell align='center' style={{fontWeight:'bold',fontSize:18,backgroundColor:blue[500],color:'white'}}>Status</TableCell>
                            {/* <TableCell align='center' style={{fontWeight:'bold',fontSize:18,backgroundColor:blue[500],color:'white'}}>Action</TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {appointments.map((appointment,index)=>
                        {
                            return(
                            <TableRow>
                                <TableCell align="center">{index+1}</TableCell>
                                <TableCell align="center">{appointment.userId}</TableCell>
                                <TableCell align="center">{appointment.course.courseName}</TableCell>
                                <TableCell align="center">{appointment.slot}</TableCell>
                                <TableCell align="center">{appointment.date}</TableCell>
                                <TableCell align="center">{appointment.rescheduled_Date}</TableCell>
                                <TableCell align="center">{appointment.rescheduled_Slot}</TableCell>
                                <TableCell align="center">{appointment.status}</TableCell>
                                {/* <TableCell align="center"><Button  variant='contained' sx={{backgroundColor:amber[800],mb:2}}>Reschedule</Button>
                                <Button  variant='contained' sx={{backgroundColor:red[800],mb:2}}>Cancel</Button></TableCell> */}
                            </TableRow>)
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
        

}
export default UserAppointents