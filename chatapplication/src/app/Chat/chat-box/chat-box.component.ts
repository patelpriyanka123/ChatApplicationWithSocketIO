import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit {
  userDetail = this.user.usernameSource.asObservable();
  userData: any;

  constructor(private user: UserService) { }

  ngOnInit(): void {
    this.userDetail.subscribe((obj) => {
      this.userData = obj;
    })
  }
}
