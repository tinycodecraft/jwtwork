using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace JwtWork.Hubs
{
    public class UsersHub : Hub<IUsersHub>
    {
        
        public async Task UserLogin() => await Clients.All.UserLogin();
        public async Task UserLogout() => await Clients.All.UserLogout();
        public async Task CloseAllConnections(string reason) => await Clients.All.CloseAllConnections(reason);

        public async Task<string> GetConnectionId() => await Task.FromResult(Context.ConnectionId);
    }
}