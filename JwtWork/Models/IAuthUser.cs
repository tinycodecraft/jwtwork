namespace JwtWork.Models
{
    public interface IAuthUser
    {
        string Status   { get; }
        string Token    { get; }
        string RefreshToken { get; }
        string UserName { get; }

        string Error { get;  }
    }
}