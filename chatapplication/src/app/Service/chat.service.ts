import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io } from 'socket.io-client';
import { SendReceiveMsg } from '../model/sendReceiveMsg';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public message$: BehaviorSubject<SendReceiveMsg> = new BehaviorSubject(new SendReceiveMsg());
  public user$: BehaviorSubject<User> = new BehaviorSubject(new User());
  public userList$: BehaviorSubject<Array<User>> = new BehaviorSubject(new Array<User>());
  constructor() {}

  socket = io('http://localhost:3000');

  public sendUser(user: User) {
    this.socket.emit('user', user);
  }

  public sendMessage(message: SendReceiveMsg) {
    this.socket.emit('message', message);
  }

  public getUser = () => {
    this.socket.on('user', (user) =>{
      this.user$.next(user);
    });
    
    return this.user$.asObservable();
  };

  public getNewMessage = () => {
    this.socket.on('message', (message) =>{
      this.message$.next(message);
    });
    
    return this.message$.asObservable();
  };  


  public getUserList = () => {
    this.socket.on('userList', (userList) =>{
      this.userList$.next(userList);
    });
    
    return this.userList$.asObservable();
  };

}
