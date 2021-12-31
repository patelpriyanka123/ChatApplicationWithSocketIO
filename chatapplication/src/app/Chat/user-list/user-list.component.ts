import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from 'src/app/model/user';
import { userList } from 'src/app/model/userList';
import { ChatService } from 'src/app/Service/chat.service';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  counter: number = 1;
  loggedIn: string = '';
  userDetailsList: Array<User>=[];
  constructor(private user: UserService, private chatService: ChatService ) { }

  ngOnInit(): void {
    this.getUserList();
    window.addEventListener('storage', () => {
      this.getUserList();
    });
    this.chatService.getUser().subscribe((user: User) => {
      if(user){
        const usr = this.userDetailsList.filter((result:User) => result.userId === user.userId);
        if(usr.length>0){
          usr[0].isLoggedIn= user.isLoggedIn;
        }
      }
     
    })
  }

  onUserClick(user: any) {
    this.user.usernameSource.next(user);
  }

  getUserList() {
    // const data = JSON.parse(localStorage.getItem("registerUser") as any) || [];
    const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUserDetail") as any);
    this.userDetailsList = userList.filter((result:User) => result.userName !== loggedInUser[0].userName); 
  }

}
