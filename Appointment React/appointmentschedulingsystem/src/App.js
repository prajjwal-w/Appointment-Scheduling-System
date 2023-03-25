
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter,Route,Routes} from "react-router-dom";
import BookAppointment from './components/Booking/BookAppointment';
import RescheduleAppointment from './components/Booking/RescheduleAppointment';
import RescheduleDate from './components/Booking/RescheduleDate';
import UserAppointments from './components/UserAppointments';
import Courses from './components/Course/Courses';
import Navigation from './components/Navigation'
import CancelAppointment from './components/Booking/CancelAppointment';
import Login  from './components/Login';
import Register  from './components/Register';
import { useState,createContext } from 'react';
import UserProfile from './components/UserProfile';

export const UserContext = createContext()

function App() {
  const [user,setUser]=useState('')
  const [token,setToken] = useState('')
  return (
    <>
    <UserContext.Provider value={{user,setUser,token,setToken}}>
    <div>  
      <BrowserRouter>
      <Routes>
      <Route exact path='/' element={<Login/>}/>
      <Route exact path='/register' element={<Register/>}/>
        <Route exact path='/bookAppointment' element={<BookAppointment/>}/>
        <Route exact path='/userProfile' element={<UserProfile/>}/>
        <Route exact path='/rescheduleAppointment' element={<RescheduleAppointment/>}/>
        <Route exact path='/userAppointment' element={<UserAppointments/>}/>
        <Route exact path='/courses' element={<Courses/>}/>
        <Route exact path='/cancelAppointment' element={<CancelAppointment/>}/>
      </Routes>
    </BrowserRouter>
    </div>
    </UserContext.Provider>
    </>
    
  );
}

export default App;
