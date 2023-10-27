using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JwtWork.Abstraction.Models
{
    public class ItCredentials:IItCredentials
    {
        public string? UserName { get; set; }
        public string? Password { get; set; }
        public string? NewPassword { get; set; }
        public bool RememberMe { get; set; }
    }
}
