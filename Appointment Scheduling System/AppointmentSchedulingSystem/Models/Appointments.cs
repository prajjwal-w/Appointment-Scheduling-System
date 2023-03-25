using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AppointmentSchedulingSystem.Models
{
    public class Appointments
    {
        [Key,DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int Slot { get; set; }
        public DateTime? Rescheduled_Date { get; set; }
        public int? Rescheduled_Slot { get; set; }
        public String Status { get; set; }
     
        [ForeignKey("User")]
        public int UserId { get; set; }
        
        [ForeignKey("Course")]
        public int CourseId { get; set; }

        public virtual User User { get; set; }

        
        public virtual Course Course { get; set; }
    }

}
