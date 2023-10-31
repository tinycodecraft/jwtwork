using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JwtWork.Abstraction.Models
{
    public class ItSort
    {
        public bool Desc { get; set; }

        public string Id { get; set; }

    }

    public class ItFilter
    {
        public string Id { get; set; }  
        public string Value { get; set; }
    }

    public class ItMantineQuery
    {
        public string Type { get; set; }

        //record start index
        public int Start { get; set; }

        //page size
        public int Size { get; set; }

        public ItFilter[] Filtering { get; set; }

        public string GlobalFilter { get; set; }

        public ItSort[] Sorting { get; set; }
    }
    

}
