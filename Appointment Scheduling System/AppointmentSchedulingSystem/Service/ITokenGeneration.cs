using AppointmentSchedulingSystem.UserCredentials;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppointmentSchedulingSystem.Service
{
    public interface ITokenGeneration
    {
        string GenerateToken(UserCreds userCreds);
    }
}
