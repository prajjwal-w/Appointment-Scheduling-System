using AppointmentSchedulingSystem.Models;
using AppointmentSchedulingSystem.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppointmentSchedulingSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("Cors")]
    public class AppointmentController : ControllerBase
    {
        readonly IAppointmentRepository _appointmentRepository;
        public AppointmentController(IAppointmentRepository appointment)
        {
            _appointmentRepository = appointment;
        }

        [Authorize]
        [HttpGet]
        [Route("GetAllAppointment")]
        public ActionResult GetAllAppointment()
        {
            List<Appointments> appointments = _appointmentRepository.GetAllAppointment();
            if(appointments != null)
            {
                return Ok(appointments);
            }
            else
            {
                return Ok("No Appointment Booked");
            }
        }

        [Authorize]
        [HttpGet]
        [Route("GetAppointmentsByUser")]
        public ActionResult GetAppointmentsByUser(int id,DateTime date)
        {
            var appoint = _appointmentRepository.GetAppointmentsByUser(id,date);
            if (appoint != null)
            {
                return Ok(appoint);
            }
            return Ok("Appointment Not Found");
        }

        [Authorize]
        [HttpGet]
        [Route("GetAllAppointmentUser")]
        public ActionResult GetAllAppointmentUser(string userName)
        {
            List<Appointments> appointments = _appointmentRepository.GetAllAppointmentsUser(userName);
            if(appointments!=null)
            {
                return Ok(appointments);
            }
            return Ok(null);
        }

        [Authorize]
        [HttpPost]
        [Route("AddAppointment")]
        public ActionResult AddAppointment(Appointments appointments)
        {
            var appoint = _appointmentRepository.AddAppointment(appointments);
            if(appoint == null)
            {
                return Ok("You already Booked an Appointment for a given date");
            }
            return Ok("Appointment Added");
        }

        [Authorize]
        [HttpPut]
        [Route("RescheduleAppointment")]
        public ActionResult RescheduleAppointment(Appointments appointments)
        {
            var appoint = _appointmentRepository.RescheduleAppointment(appointments);
            if(appoint != null)
            {
                return Ok("Rescheduled");
            }
            return Ok("Some Error Occured!! Maybe Not Reschdeuled");
            
        }

        [Authorize]
        [HttpPut]
        [Route("CancelAppointment")]
        public ActionResult CancelAppointment(int id)
        {
            var appoint = _appointmentRepository.CancelAppointment(id);
            if(appoint != null)
            {
                return Ok("Appointment Canceled!!");

            }
            return Ok("Not Canceled");
        }
        
        [HttpDelete]
        [Route("DeleteAppointmentEntry")]
        public ActionResult DeleteAppointmentEntry(int id)
        {
            var appoint = _appointmentRepository.DeleteAppointmentEntry(id);
            if(appoint != null)
            {
                return Ok("AppointMent Deleted");
            }
            return Ok("Not Deleted");
        }
    }
}
