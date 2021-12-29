import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  usernameSource = new BehaviorSubject({});
  messageSource = new BehaviorSubject(true);
  constructor() { }
}
