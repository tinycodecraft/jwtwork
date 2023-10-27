using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JwtWork.Abstraction.Models
{
    public class RtAuthUser
    {
        public string Status { get; set; }

        public string Error { get; set; }
        public string Token { get; set; }

        public string RefreshToken { get; set; }
        public string UserName { get; set; }

        public bool NeedNew { get; set; }


        public RtAuthUser(string status, string token, string refreshToken, string userName, string error = "", bool needNew = false)
        {
            Status = status;
            Token = token;
            RefreshToken = refreshToken;
            UserName = userName;
            Error = error;
            NeedNew = needNew;
        }

        public static RtAuthUser CreateFailureFor(string userName, string error, bool needNew)
        {
            return new RtAuthUser(Constants.Status.failure, "", "", userName, error, needNew);

        }
    }
}
