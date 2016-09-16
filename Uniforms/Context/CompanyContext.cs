using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using Uniforms.Models;

namespace Uniforms.Context
{
    public class CompanyContext : DbContext 
    {
        public DbSet<Company> Company { get; set; }
    }
}