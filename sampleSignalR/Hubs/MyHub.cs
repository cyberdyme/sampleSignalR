using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace sampleSignalR.Hubs
{
    public class MyHub : Hub
    {
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
    }
}
