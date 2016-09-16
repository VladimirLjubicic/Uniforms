using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Uniforms.Models
{
    public class Company
    {
        public int CompanyID { get; set; }
        
        [Required]
        public string Name { get; set; }

        [Required]
        public string Uniform { get; set; }
    }
}