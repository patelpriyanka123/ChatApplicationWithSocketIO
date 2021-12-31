import { Component } from '@angular/core';
import { io } from 'socket.io-client';
import { User } from 'src/app/model/user';
import { userList } from './model/userList';
import { ChatService } from './Service/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private chatService: ChatService){}
  usersList = userList;
  ngOnInit(): void {
    let me =this;  
    window.addEventListener('beforeunload', (event) =>{
      const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUserDetail") as any);
      // const data = JSON.parse(localStorage.getItem("registerUser") as any) || [];
      const user = me.usersList.filter((result: User) => result.userName === loggedInUser[0].userName && result.password === loggedInUser[0].password);
      if(user.length > 0 ) {
        user[0].isLoggedIn = false;
        me.chatService.sendUser(user[0]); 
      }
    });

  }
}
