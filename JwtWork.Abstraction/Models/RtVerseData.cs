using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JwtWork.Abstraction.Models
{

    public class RtItem
    {
        public string name { get; set; }

        public string description { get; set; }

        public string type { get; set; }

        public string url { get; set;}

        public string dataset_name { get; set; }
        public string file_id { get; set; }
        public string file_type { get; set; }

        public string file_content_type { get; set;}

        public uint size_in_bytes { get; set;}

        public DateTime published_at { get; set; }  

    }

    public class RtData
    {
        public int total_count { get; set; }

        public int start { get; set; }

        public RtItem[] items { get; set; }
    }

    public class RtVerseData
    {

        public string status { get; set; }

        public RtData data { get; set; }


    }

    public class RtDTOVerseData
    {
        public string status { get; set; }

        public int total_count { get; set; }
        public int start { get; set; }
        
        public RtItem[] items { get; set;}=new RtItem[0];
    }
}
