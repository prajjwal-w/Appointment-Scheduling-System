using AppointmentSchedulingSystem.Models;
using AppointmentSchedulingSystem.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppointmentSchedulingSystem.Service
{
    public class UserService:IUserService
    {
        readonly IUserRepository _userRepository;
        //Constructor
        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public User AddUser(User user)
        {
            return _userRepository.AddUser(user);
           
        }

        public List<User> GetAllUser()
        {
            return _userRepository.GetAllUser();
        }
    }
}
