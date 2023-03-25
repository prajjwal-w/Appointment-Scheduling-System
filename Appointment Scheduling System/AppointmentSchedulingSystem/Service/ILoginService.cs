using AppointmentSchedulingSystem.Models;
using AppointmentSchedulingSystem.UserCredentials;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppointmentSchedulingSystem.Service
{
    public interface ILoginService
    {
        UserCreds Login(UserCreds userCredentials);
        UserCreds Register(User user);
    }
}
