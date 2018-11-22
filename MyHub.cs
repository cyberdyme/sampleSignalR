

using Microsoft.AspNetCore.SignalR;

namespace sampleSignalR
{
    public class MyHub : Hub {
        public async void Send(string name, string message)
        {
            // Call the broadcastMessage method to update clients.
            await Clients.All.SendAsync("broadcastMessage", name, message);
        }
    }
}