import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io } from 'socket.io-client';
import { SendReceiveMsg } from '../model/sendReceiveMsg';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public message$: BehaviorSubject<SendReceiveMsg> = new BehaviorSubject(new SendReceiveMsg());
  constructor() {}

  socket = io('http://localhost:3000');

  public sendMessage(message: SendReceiveMsg) {
    this.socket.emit('message', message);
  }

  public getNewMessage = () => {
    this.socket.on('message', (message) =>{
      this.message$.next(message);
    });
    
    return this.message$.asObservable();
  };
}
