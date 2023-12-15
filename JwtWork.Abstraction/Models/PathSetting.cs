using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JwtWork.Abstraction.Models
{
    public class PathSetting
    {
        public string Share { get; set; }
        public string Upload { get; set; }
        public string Stream { get; set; }

        public string Template { get; set; }

        public string Base { get; set; }
    }
}
