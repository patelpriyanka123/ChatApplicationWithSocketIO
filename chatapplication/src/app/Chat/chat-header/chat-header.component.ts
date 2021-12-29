import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-chat-header',
  templateUrl: './chat-header.component.html',
  styleUrls: ['./chat-header.component.scss']
})
export class ChatHeaderComponent implements OnInit {
  userDetail = this.user.usernameSource.asObservable();
  userData: any;

  constructor(private user: UserService) { }

  ngOnInit(): void {
    this.userDetail.subscribe((obj) => {
      this.userData = obj;
    })
  }

}
