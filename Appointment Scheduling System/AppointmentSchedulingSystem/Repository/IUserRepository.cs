using AppointmentSchedulingSystem.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppointmentSchedulingSystem.Repository
{
    public interface IUserRepository
    {
        List<User> GetAllUser();
        User AddUser(User user);

        User GetUser(string userName);
    }
}
