import { AppComponent } from './../app.component';
import { Component, OnInit } from '@angular/core';
// import { DoLoginService } from '../do-login.service';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../api.service';

import * as _ from 'lodash';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  providers: []
})
export class LoginComponent implements OnInit {
  username: string = "";
  password: string = "";
  acc: number = 0;

  constructor(private router: Router, private api: ApiService) { }

  ngOnInit(): void {
  }

  loginUser(): void {
    //API service
    let userDetails = this.api.login(this.username, this.password)
    console.log(userDetails)
    // this.api.sessionData = [this.username]
    sessionStorage.setItem('loggedUser', userDetails[0])
    let usrnm = sessionStorage.getItem('loggedUser')

    if (userDetails[1] == "1") {
      console.log("employee user");
      this.router.navigate(['employee']);
      console.log(usrnm);
    } else if (userDetails[1] == "2") {
      console.log("manager user");
      this.router.navigate(['manager']);
      console.log(usrnm);
    } else if (userDetails[1] == "3") {
      console.log("hr admin");
      this.router.navigate(['hr-admin']);
      console.log(usrnm);
    } else {
      this.acc = 1
      sessionStorage.clear()
      console.log("help", usrnm);
    }
  }
}



/*login screen -> blank page

blank:

3 links LoginComponent
  request leave
  approve
  manage users 


login return user object with permissions
store currently logged-in-user property in API service (for now)

*ngIf access level = what displays

if null - failed

*/