import { Component } from '@angular/core';
import { User } from 'src/app/model/user';
import { userList } from './model/userList';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  ngOnInit(): void {
    const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUserDetail") as any);
    window.addEventListener('unload', function(event) {
      // const data = JSON.parse(localStorage.getItem("registerUser") as any) || [];
      const user = userList.filter((result: User) => result.userName === loggedInUser[0].userName && result.password === loggedInUser[0].password);
      if(user.length > 0 ) {
        user[0].isLoggedIn = false;
       // localStorage.setItem('registerUser', JSON.stringify(data));
      }
    });

  }
}
