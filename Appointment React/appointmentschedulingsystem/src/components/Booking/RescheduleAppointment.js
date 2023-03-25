import axios from "axios";
import { useState } from "react";
import {Box,Button,Table,TableBody,TableCell,TableContainer,
    TableHead,TableRow,TextField,Typography,Grid,Card, CardContent} from '@mui/material';
import {purple,pink,deepPurple,blue,white,red,grey} from '@mui/material/colors';
import RescheduleDate from "./RescheduleDate";
import Navigation from '../Navigation'
function RescheduleAppointment(){
    const [date,setDate] = useState("")
    const [button,setButton] = useState(false)
    const [appointment,setAppointment] = useState({
        id:0,
        slot:0,
        date:"",
        rescheduled_Date:"",
        rescheduled_Slot:0,
        userId:0,
        courseId:0,
        status:"",
        course:{
            courseName:""
        }
    })
    const disablePastDate=()=>{
        const today = new Date();
        const dd = String(today.getDate()).padStart(2,'0');
        const mm = String(today.getMonth() +1).padStart(2,"0");
        const yyyy = today.getFullYear();
        
        return yyyy+"-"+mm+"-"+dd; 
    };
    async function getAppointmentsByDate(){
        const appoinmentData = await axios.get(`http://localhost:39930/api/Appointment/GetAppointmentsByUser`,{params:{
          date:date,
          id:localStorage.getItem("userId")
        },headers:{'Authorization': 'Bearer ' + localStorage.getItem("token")}})
        if(appoinmentData.data === "Appointment Not Found")
        {
            alert("Appointment Not Found");
        }
        else{
            setAppointment(appoinmentData.data)
            console.log(appoinmentData)
        }  
    }

    async function afterClick(){
        setButton(true)
       
    } 
    
    return(
        <>
        <Navigation/> 
        {button == true && <RescheduleDate props={{appointment}}/>}
        {button == false && 
        <div >
            
            <Box textAlign='center' sx={{backgroundColor:purple[600],color:'white'}}>
                <Typography variant='h3'>Reschedule Appointment</Typography>
            </Box>
            <Box textAlign='center' sx={{mx:'auto',width:500}}>
            <Card sx={{my:4,backgroundColor:grey[900],color:'white'}}>
                <CardContent >
                    <Typography variant="h5">Select Date</Typography>
                    <input type="text" id="Date"
                    className='form-control form-control-lg'
                    placeholder="Date"
                    onFocus={(e)=>e.currentTarget.type="date"}
                    onBlur={(e)=>e.currentTarget.type="text"}
                    min={disablePastDate()}
                    value={date} onChange={(e)=>setDate(e.target.value)}>
                    </input>
                </CardContent>
                <Button type= "submit" variant='contained' sx={{mb:2}} onClick={()=>getAppointmentsByDate()}>Check Appointments</Button>
            </Card>
            </Box> 
            <Box textAlign='center' sx={{backgroundColor:blue[900],color:'white'}}>
                <Typography variant='h4'>Appointment Details</Typography>
            </Box>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center' style={{backgroundColor:blue[500],color:'white'}}>User Id</TableCell>
                            <TableCell align='center' style={{backgroundColor:blue[500],color:'white'}}>Course</TableCell>
                            <TableCell align='center' style={{backgroundColor:blue[500],color:'white'}}>Slot</TableCell>
                            <TableCell align='center' style={{backgroundColor:blue[500],color:'white'}}>Date</TableCell>
                            <TableCell align='center' style={{backgroundColor:blue[500],color:'white'}}>Reschedule Date</TableCell>
                            <TableCell align='center' style={{backgroundColor:blue[500],color:'white'}}>Reschedule Slot</TableCell>
                            <TableCell align='center' style={{backgroundColor:blue[500],color:'white'}}>Status</TableCell>
                            <TableCell align='center' style={{backgroundColor:blue[500],color:'white'}}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        
                            <TableRow>
                                <TableCell align="center">{appointment.userId}</TableCell>
                                <TableCell align="center">{appointment.course.courseName}</TableCell>
                                <TableCell align="center">{appointment.slot}</TableCell>
                                <TableCell align="center">{appointment.date}</TableCell>
                                <TableCell align="center">{appointment.rescheduled_Date}</TableCell>
                                <TableCell align="center">{appointment.rescheduled_Slot}</TableCell>
                                <TableCell align="center">{appointment.status}</TableCell>
                                <TableCell align="center"><Button  variant='contained' sx={{backgroundColor:red[800],mb:2}} onClick={afterClick}>Reschedule</Button></TableCell>
                            </TableRow>
                        
                    </TableBody>
                </Table>
            </TableContainer>
            
             
            </div>}
        </>
    )
}
export default RescheduleAppointment