using AppointmentSchedulingSystem.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppointmentSchedulingSystem.Repository
{
    public interface IAppointmentRepository
    {
        List<Appointments> GetAllAppointment();
        Appointments GetAppointmentsByUser(int id,DateTime date);
        Appointments RescheduleAppointment(Appointments appointments);
        Appointments CancelAppointment(int id);
        Appointments AddAppointment(Appointments appointments);
        Appointments DeleteAppointmentEntry(int id);

        List<Appointments> GetAllAppointmentsUser(string userName);
    }
}
