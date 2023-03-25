using AppointmentSchedulingSystem.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppointmentSchedulingSystem.Service
{
    public interface IUserService
    {
        List<User> GetAllUser();
        User AddUser(User user);
    }
}
