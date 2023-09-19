namespace JwtWork.Models
{
    public class AuthUser : IAuthUser
    {
        public string Status   { get; }

        public string Error { get; set; }
        public string Token    { get; }
        public string UserName { get; }

        public bool NeedNew { get;  }

        public AuthUser(string status, string token, string userName, string error="", bool needNew=false)
        {
            Status = status;
            Token = token;
            UserName = userName;
            Error = error;
            NeedNew = needNew;
        }
    }
}