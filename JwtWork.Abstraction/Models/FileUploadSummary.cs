using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JwtWork.Abstraction.Models
{
    public class FileUploadSummary
    {
        public int TotalFilesUploaded { get; set; }
        public string TotalSizeUploaded { get; set; }
        public IList<string> FilePaths { get; set; } = new List<string>();
        public IList<string> NotUploadedFiles { get; set; } = new List<string>();
    }
}
