import { Component, OnInit } from '@angular/core';
import * as signalR from '@aspnet/signalr';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    connection: signalR.HubConnection;
    msgs: string[] = [];

    ngOnInit(): void {
      this.connection = new signalR.HubConnectionBuilder().withUrl("/myHub").build();

      this.connection.on("ReceiveMessage", (user: string, message: string) => {
        console.log("receive message");
        console.log(message);
        this.msgs.push(message);
      });

      this.connection.start()
        .then(() => {
          console.log("connection has started");

          this.sendDirectMessage('girish', 'This is amazing(1)');
          this.sendDirectMessage('monu', 'yes it is');
        })
        .catch((err) => {
          return console.error(err.toString());
        });

      setTimeout(() => {
        this.sendDirectMessage('girish', 'This is amazing(3)');
        this.sendDirectMessage('monu', 'yes it is');
      }, 2000);
    }

  sendDirectMessage(message: string, userId: string): void {

    this.connection.invoke('SendMessage', message, userId).then(x => {
      console.log("message sent");
    });
    //return message;
  }
}
