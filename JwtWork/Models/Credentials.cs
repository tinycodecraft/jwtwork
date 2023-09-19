namespace JwtWork.Models
{
    public class Credentials : ICredentials
    {
        public string? UserName   { get; set; }
        public string? Password   { get; set; }
        public string? NewPassword { get; set; }
        public bool    RememberMe { get; set; }
    }
}