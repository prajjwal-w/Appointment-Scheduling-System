using AppointmentSchedulingSystem.Models;
using AppointmentSchedulingSystem.Repository;
using AppointmentSchedulingSystem.UserCredentials;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Cryptography;
using System.Text;

namespace AppointmentSchedulingSystem.Service
{
    public class LoginService : ILoginService
    {
        private readonly IUserRepository _userRepository;
        private readonly ITokenGeneration _tokenGeneration;
        //constructor
        public LoginService(IUserRepository userRepository,ITokenGeneration tokenGeneration)
        {
            _userRepository = userRepository;
            _tokenGeneration = tokenGeneration;
        }
        public UserCreds Login(UserCreds userCredentials)
        {
            var user=_userRepository.GetAllUser().FirstOrDefault(u=>u.Username==userCredentials.UserName);
            
            if (user != null)
            {

                if (userCredentials.Password != user.Password)
                {
                    return null;
                }
                userCredentials.Password = user.Password;
                userCredentials.Token = _tokenGeneration.GenerateToken(userCredentials);
                return userCredentials;              
            }
            return null;
            
        }

        public UserCreds Register(User user)
        {
            var existing = _userRepository.GetAllUser().FirstOrDefault(u => u.Username == user.Username);
            if(existing == null)
            {
                user.DOB = Convert.ToDateTime(user.DOB);
                var userDetails = _userRepository.AddUser(user);
                if (userDetails != null)
                {
                    return new UserCreds
                    {
                        UserName = user.Username,
                        Token = _tokenGeneration.GenerateToken(new UserCreds
                        {
                            UserName = user.Username
                        })
                    };

                }

            }
            
            return null;
        }
    }
}
