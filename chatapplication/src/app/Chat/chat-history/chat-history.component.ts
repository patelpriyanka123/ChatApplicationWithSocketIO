import { Component, OnInit } from '@angular/core';
import { SendReceiveMsg } from 'src/app/model/sendReceiveMsg';
import { ChatService } from 'src/app/Service/chat.service';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-chat-history',
  templateUrl: './chat-history.component.html',
  styleUrls: ['./chat-history.component.scss']
})
export class ChatHistoryComponent implements OnInit {
  messageDetail = this.user.messageSource.asObservable();
  userDetail = this.user.usernameSource.asObservable();
  userData: any = {};
  loggedInUser: any;
  messageList: Array<SendReceiveMsg> = [];
//messageList: string[] = [];

  constructor(private user: UserService, private chatService: ChatService) { }

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUserDetail") as any);
    // this.userDetail.subscribe((obj) => {
    //   this.userData = obj;
    //   this.getUserMessages();
    // });
    // this.messageDetail.subscribe((isNewMessage) => {
    //   if (isNewMessage) {
    //     this.getUserMessages();
    //   }
    // });
    // window.addEventListener('storage', () => {
    //   this.getUserMessages();
    // });
    this.chatService.getNewMessage().subscribe((message: SendReceiveMsg) => {
      if(Object.keys(message).length>0 && message.message !== ""){
        this.messageList.push(message);
      }
     
    })
  }

  getUserMessages() {
    // this.messageList = JSON.parse(localStorage.getItem("messageData") as any) || [];
    // this.messageList = this.messageList.filter((x) => (x.senderId == this.userData.userId && x.receiverId == this.loggedInUser[0].userId) || (x.receiverId == this.userData.userId && x.senderId == this.loggedInUser[0].userId))
  }
}
