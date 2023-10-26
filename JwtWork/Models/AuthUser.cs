using JwtWork.Abstraction;

namespace JwtWork.Models
{
    public class AuthUser : IAuthUser
    {
        public string Status   { get; set; }

        public string Error { get; set; }
        public string Token    { get; set; }

        public string RefreshToken { get; set; }
        public string UserName { get; set; }

        public bool NeedNew { get; set; }

        
        public AuthUser(string status, string token,string refreshToken, string userName, string error="", bool needNew=false)
        {
            Status = status;
            Token = token;
            RefreshToken = refreshToken;
            UserName = userName;
            Error = error;
            NeedNew = needNew;
        }

        public static AuthUser CreateFailureFor(string userName,string error,bool needNew)
        {
            return new AuthUser(Constants.Status.failure, "", "", userName, error, needNew);

        }
    }
}