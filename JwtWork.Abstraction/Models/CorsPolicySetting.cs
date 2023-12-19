using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JwtWork.Abstraction.Models
{
    public class CorsPolicySetting
    {
        public string Name { get; set; }
        public string[] AllowHeaders { get; set; }
        public string[] AllowMethods { get; set;}
        
        public string[] AllowOrigins { get; set; }

    }
}
