import {Box,Button,TextField,Typography,Grid,Card, CardContent} from '@mui/material';
import {purple,pink,deepPurple,blue,white,grey} from '@mui/material/colors';
import {useState} from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Slots from '../Slots';
import Navigation from '../Navigation'
function RescheduleDate(props){
    const apnt = props
    const [date,setDate]=useState("")
    const [status,setStatus]=useState({
        code:0
    })
    const [prevDate,setPrevDate]=useState()
    const [prevSlot,setPrevSlot]=useState()
    const [course,setCourse]=useState()
    const [trainer,setTrainer]=useState()
    const [id,setId]=useState()
    const [courseId,setCourseId]=useState()
    const [booking,setBooking]=useState({
        date:"",
        id:0,
        courses:0,
        slot_1:null,
        slot_2:null,
        slot_3:null,
        slot_4:null,
        slot_5:null,
    })    
    const disablePastDate=()=>{
        const today = new Date();
        const dd = String(today.getDate()).padStart(2,'0');
        const mm = String(today.getMonth() +1).padStart(2,"0");
        const yyyy = today.getFullYear();
        
        return yyyy+"-"+mm+"-"+dd; 
    };
    useEffect(()=>{
        setPrevDate(apnt.props.appointment.date)
        setPrevSlot(apnt.props.appointment.slot)
        setId(apnt.props.appointment.id)
        setCourse(apnt.props.appointment.course.courseName)
        setTrainer(apnt.props.appointment.course.trainerName)
        setCourseId(apnt.props.appointment.courseId)
    })

    async function getSlotsByDateCourse(){
        var slot = await axios.get(`http://localhost:39930/api/Booking/GetBookingsByDate`,{params:{
            date:date,
            course:courseId
        },headers:{'Authorization': 'Bearer ' + localStorage.getItem("token")}}).catch(function(error){
            if(error.response)
            {
                console.log("Date not Entered")
                alert("Enter a Date")
            }    
        })
        console.log(slot.data)
        console.log(slot.data.date);

        var booking={
            date:slot.data.date,
            id:id,
            courses:courseId,
            courseName:course,
            trainerName:trainer,
            slot_1:slot.data.slot_1,
            slot_2:slot.data.slot_2,
            slot_3:slot.data.slot_3,
            slot_4:slot.data.slot_4,
            slot_5:slot.data.slot_5,
            prevDate:prevDate,
            prevSlot:prevSlot
        } 
            console.log(apnt)
            setStatus(slot.status)
            console.log(booking)
            setBooking(booking); 
                
    }

     if(status === 204 || status === 200)
    {
        return(
        
        <Slots props={booking}/>
       
        )
    }  
    return( 
         <div >
            
            <Box textAlign='center' sx={{backgroundColor:purple[600],color:'white'}}>
                <Typography variant='h3'>Reschedule Appointment</Typography>
            </Box>
            <Box textAlign='center' sx={{mx:'auto',width:500}}>
            <Card sx={{my:4,backgroundColor:grey[900],color:'white'}}>
                <CardContent >
                    <Typography variant="h5">Select Reschedule Date</Typography>
                    <input type="text" id="Date"
                    className='form-control form-control-lg'
                    placeholder="Date"
                    onFocus={(e)=>e.currentTarget.type="date"}
                    onBlur={(e)=>e.currentTarget.type="text"}
                    min={disablePastDate()}
                    value={date} onChange={(e)=>setDate(e.target.value)}>
                    </input>
                    
                </CardContent>
                <Button type= "submit" variant='contained' sx={{mb:2}} onClick={getSlotsByDateCourse}>Select Slot</Button>
            </Card>
            </Box> 
             
            </div>
        
    )
    
}
export default RescheduleDate