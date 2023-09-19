using System.Threading.Tasks;

namespace JwtWork.Hubs
{
    public interface IUsersHub
    {
        Task UserLogin();
        Task UserLogout();
        Task CloseAllConnections(string reason);
    }
}