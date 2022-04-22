

import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../api.service';
// import { LoginComponent } from '../login/login.component';
// import { PrimeNGModule } from './../primeng.module';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  
  newusername: string = "";
  newpassword: string = "";
  accesslevel: number = 0;
  newdepartment: string = "";
  leavedays: string = "";
  
  constructor(private router: Router, private api: ApiService) { }


  leave: any[] = [];
  users: any[] = [];
  columns: any[] = [
    { header: "Leave ID", field: "leaveId" },
    { header: "User", field: "username" },
    { header: "Start Date", field: "dateTaken" },
    { header: "End Date", field: "dateTaken" },
    { header: "Days taken", field: "daysTaken" },
    { header: "Type of leave", field: "leaveType" },
    { header: "Leave Status", field: "leaveStatus" }
  ]
  columnUser: any[] = [
    { header: "User", field: "username" },
    { header: "Access level", field: "access" },
    { header: "Department", field: "department" },
    { header: "Leave remaining", field: "leave_days_left" },

  ]
  showUsers: boolean = false;
  showForm: boolean = false;
  tbl: boolean = false;
  leaveDays: number = 0;

  username: string = "";
  leaveID: string = "-1";
  ngOnInit() {
    this.username = (sessionStorage.getItem('loggedUser')!)
  }

  logOut(): void {
    console.log('clicked back')
    sessionStorage.clear()
    this.router.navigate(['login'])
  }

  viewLeaveRequests(): void {
    this.showUsers = false
    this.tbl = true
    //do var and call property {{}}}
    this.leave = this.api.getLeaveRequests()
    console.log(this.leave)
  }

  approve(): void {
    if (Number(this.leaveID) > -1) {
      let arrIndex = this.api.db.leaveHistory.findIndex(((obj: { leaveId: string; }) => obj.leaveId == this.leaveID));
      if (arrIndex == -1) {
        alert(`You've entered an incorrect leave ID!`)
      }
      else {
        this.api.db.leaveHistory[arrIndex].leaveStatus = "Approved"
      }
    }
    else {
      alert(`You've entered an incorrect leave ID!`)

      console.log(this.leaveID)
    }
  }

  manageUsers(): void {
    this.showUsers = true;
    this.tbl = false
    this.users = this.api.getUsers();
  }

  editUser(user: any): void {
    console.log(user)
  }

  addUser(): void {
    this.showForm = true
  }

  submit() {
    let newUser = {
      username: this.newusername,
      password: this.newpassword,
      access: this.accesslevel,
      department: this.newdepartment,
      leave_days_left: this.leavedays
    }

    console.log(newUser)

    this.api.db.user.push(newUser)
    this.showForm = false
  }

}
