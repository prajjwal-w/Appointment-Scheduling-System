using AppointmentSchedulingSystem.Context;

using AppointmentSchedulingSystem.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppointmentSchedulingSystem.Repository
{
    public class UserRepository : IUserRepository
    {
        readonly AppointmentDbContext _dbContext;
        //constructor
        public UserRepository(AppointmentDbContext dbContext)
        {
            _dbContext = dbContext;    
        }
        public User AddUser(User user)
        {
      
                _dbContext.Users.Add(user);
                _dbContext.SaveChanges();
                return user;   
  
        }

        public List<User> GetAllUser()
        {
            return _dbContext.Users.ToList();
        }

        public User GetUser(string userName)
        {
            var user = _dbContext.Users.Where(u => u.Username == userName).FirstOrDefault();
            if(user != null)
            {
                return user;
            }
            return null;
        }
    }
}
