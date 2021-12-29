import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SendReceiveMsg } from 'src/app/model/sendReceiveMsg';
import { ChatService } from 'src/app/Service/chat.service';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {
  userDetail = this.user.usernameSource.asObservable();
  sendReceiveMessage: Array<SendReceiveMsg> = [];
  messageChatForm!: FormGroup;
  userData: any = {};
  submitted = false;
  loggedInUser: any;

  messageList: string[] = [];

  constructor(private user: UserService, private chatService: ChatService, private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.messageChatForm = this.formBuilder.group({
      message: ['', [Validators.required]],
    });
    this.loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUserDetail") as any);
    this.userDetail.subscribe((obj) => {
      this.userData = obj;
    });
  }

  get f() {
    return this.messageChatForm.controls;
  }

  sendMessage() {
    this.submitted = true;
    if (!this.messageChatForm.controls) {
      return;
    } else {
   
     // this.sendReceiveMessage = JSON.parse(localStorage.getItem('messageData') as any) || [];
      let sendReceiveMsgObj = new SendReceiveMsg();
      sendReceiveMsgObj.senderId = this.loggedInUser[0]['userId'];
      sendReceiveMsgObj.receiverId = this.userData['userId'];
      sendReceiveMsgObj.message = this.messageChatForm.controls.message.value;
      sendReceiveMsgObj.datetime = new Date();
      this.chatService.sendMessage(sendReceiveMsgObj);
      this.messageChatForm.controls.message.setValue('');
      // this.sendReceiveMessage.push(sendReceiveMsgObj);
     // localStorage.setItem('messageData', JSON.stringify(this.sendReceiveMessage));
      //this.user.messageSource.next(true);
     // this.messageChatForm.controls.message.setValue('');
    }
  }

}
