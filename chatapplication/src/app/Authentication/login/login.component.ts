import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { io } from 'socket.io-client';
import { User } from 'src/app/model/user'
import { userList } from 'src/app/model/userList';
import { ChatService } from 'src/app/Service/chat.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  fieldTextType = false;
  loading = false;
  loggedInUser: any;
  userList=[]


  constructor(private formBuilder: FormBuilder, private router: Router, private chatService: ChatService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.chatService.getUserList().subscribe((userList: Array<User>) => {
      if(userList){
       console.log(userList)
      }
     
    })
    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  get f() {
    return this.loginForm.controls;
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }


  onSubmit() {
    this.submitted = true;
    this.loading = true;
    if (!this.loginForm.controls) {
      this.loading = false;
      return;
    } else {
      const userName = this.loginForm.controls.userName.value;
      const password = this.loginForm.controls.password.value;
      // const data = JSON.parse(localStorage.getItem("registerUser") as any) || [];
      const user = userList.filter((result: User) => result.userName === userName && result.password === password);
      if (user.length > 0) {
        this.loading = false;
        user[0].isLoggedIn = true;
        const socket =io();
        this.chatService.sendUser(user[0]);       
        // localStorage.setItem('registerUser', JSON.stringify(data));
        sessionStorage.setItem('loggedInUserDetail', JSON.stringify(user));
        this.router.navigate(['/chat-box']);
      } else {
        swal({
          title: 'Invalid username or password!',
          type: 'error'
        });
        this.loading = false;
      }
    }
  }
}
