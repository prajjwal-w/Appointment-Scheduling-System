using AppointmentSchedulingSystem.Context;
using AppointmentSchedulingSystem.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppointmentSchedulingSystem.Repository
{
    public class AppointmentRepository : IAppointmentRepository
    {
        readonly AppointmentDbContext _appointmentDbContext;
        public AppointmentRepository(AppointmentDbContext appointment)
        {
            _appointmentDbContext = appointment;
        }
        public List<Appointments> GetAllAppointment()
        {
            var appointments = _appointmentDbContext.Appointment.Include(u=>u.User).Include(u1=>u1.Course).ToList();
            return appointments;
        }
        public Appointments GetAppointmentsByUser(int id,DateTime date)
        {
            var appointments = _appointmentDbContext.Appointment.Where(a => a.UserId == id && a.Date == date).Include(u1=>u1.Course).FirstOrDefault();
            return appointments;
        }

        public Appointments AddAppointment(Appointments appointments)
        {
            var appoint = GetAppointmentsByUser(appointments.UserId, appointments.Date);
            if (appoint == null)
            {

                _appointmentDbContext.Appointment.Add(appointments);
                _appointmentDbContext.SaveChanges();
                return appointments;
            }
            return null;
            
        }

        public List<Appointments> GetAllAppointmentsUser(string userName)
        {
            var appointments = _appointmentDbContext.Appointment.Include(u=>u.Course).Where(u => u.User.Username == userName).ToList();
            if(appointments != null)
            {
                return (appointments);
            }
            return null;
        }
        public Appointments RescheduleAppointment(Appointments appointments)
        {
            var appointment = _appointmentDbContext.Appointment.Where(u => u.Id== appointments.Id).FirstOrDefault();
            if(appointment !=null)
            {
                appointment.Slot = appointments.Slot;
                appointment.Rescheduled_Date = appointments.Rescheduled_Date;
                appointment.Rescheduled_Slot = appointments.Rescheduled_Slot;
                appointment.Status = "Rescheduled";
                _appointmentDbContext.SaveChanges();
                return appointment;
            }
            return null;
        }

        public Appointments CancelAppointment(int id)
        {
            var appoint = _appointmentDbContext.Appointment.Where(u => u.Id == id).FirstOrDefault();
            if(appoint != null)
            {
                appoint.Status = "Cancelled";
                _appointmentDbContext.SaveChanges();
                return appoint;
            }
            return null;
        }

        public Appointments DeleteAppointmentEntry(int id)
        {
            var appoint = _appointmentDbContext.Appointment.Where(u => u.Id == id).FirstOrDefault();
            if (appoint != null)
            {
                _appointmentDbContext.Appointment.Remove(appoint);
                _appointmentDbContext.SaveChanges();
                return appoint;
            }
            return null;
        }
    }
}
