using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AppointmentSchedulingSystem.Models
{
    public class Bookings
    {
        
        [Key,DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
       
        [ForeignKey("Course")]
        public int? Courses { get; set; }
        public DateTime Date { get; set; }
        
        [ForeignKey("User_1")]
        public int? Slot_1 { get; set; }
        [ForeignKey("User_2")]
        public int? Slot_2 { get; set; }
        [ForeignKey("User_3")]
        public int? Slot_3 { get; set; }
        [ForeignKey("User_4")]
        public int? Slot_4 { get; set; }
        [ForeignKey("User_5")]
        public int? Slot_5 { get; set; }

        public virtual User User_1 { get; set; }
        public virtual User User_2 { get; set; }
        public virtual User User_3 { get; set; }
        public virtual User User_4 { get; set; }
        public virtual User User_5 { get; set; }
        public virtual Course Course { get; set; }
        
    }
}
