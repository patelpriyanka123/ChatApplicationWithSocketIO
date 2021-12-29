import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user'
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

  userList = [
    {
      firstName: "Priyanka",
      isLoggedIn: false,
      lastName: "Patel",
      password: "123456",
      userId: 1,
      userName: "Priyanka",
   },
   {
    firstName: "Ravina",
    isLoggedIn: true,
    lastName: "Patel",
    password: "123456",
    userId: 2,
    userName: "Ravina",
   }
  ]

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
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
      const user = this.userList.filter((result: User) => result.userName === userName && result.password === password);
      if(user.length > 0 ) {
        this.loading = false;
        user[0].isLoggedIn = true;
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
