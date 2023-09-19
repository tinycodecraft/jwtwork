using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static JwtWork.Abstraction.Interfaces;

namespace JwtWork.Abstraction.Models
{
    public class LoginError: ILoginError
    {
        public string Error { get; set; } = string.Empty;
        public bool NeedNew { get; set; }
    }
}
