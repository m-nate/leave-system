import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  db: any = {
    users: [
      {
        username: "admin",
        password: "admin",
        access: 3,
        department: "HR",
        leave_days_left: 12,
      },
      {
        username: "m1",
        password: "m1",
        access: 2,
        department: "Finance",
        leave_days_left: 6,
      },
      {
        username: "e1",
        password: "p1",
        access: 1,
        department: "Finance",
        leave_days_left: 1,
      },
      {
        username: "e2",
        password: "p2",
        access: 1,
        department: "Finance",
        leave_days_left: 3,
      },
    ]
    ,
    leaveHistory: [
      {
        username: "e1",
        dateTaken: new Date("2021-02-21"),
        endDate: new Date("2021-08-23"),
        daysTaken: 2,
        leaveType: "Maternity",
        leaveStatus: "Pending",
        leaveId: 1,
        department: "Finance",
      },
      {
        username: "e1",
        dateTaken: new Date("2021-06-30"),
        endDate: new Date("2021-07-02"),
        daysTaken: 2,
        leaveType: "Sick",
        leaveStatus: "Rejected",
        leaveId: 2,
        department: "Finance",
      },
      {
        username: "e2",
        dateTaken: new Date("2021-02-21"),
        endDate: new Date("2021-02-23"),
        daysTaken: 2,
        leaveType: "Maternity",
        leaveStatus: "Approved",
        leaveId: 3,
        department: "Finance",
      },
      {
        username: "e2",
        dateTaken: new Date("2021-02-21"),
        endDate: new Date("2021-02-23"),
        daysTaken: 2,
        leaveType: "Sick",
        leaveStatus: "Pending",
        leaveId: 4,
        department: "Finance",
      },
    ]

  };


  constructor() { }

  login(username: string, password: string) {
    let user = _.find(this.db.users, { 'username': username, 'password': password })
    console.log(`this is the ${user}`)
    let type = typeof user
    if (type === "undefined") {
      console.log("Entered undefined.")
      return ['', '']
      // add error component pop ups
    } else {
      return [user.username, user.access]
    }
  }

  getLeaveDays(username: string): number {
    let leave: number = _.find(this.db.users, { 'username': username }).leave_days_left
    return leave;
  }

  getLeaveHistory(username: string): any {
    let leaveHist: any = _.filter(this.db.leaveHistory, { 'username': username })
    return leaveHist;
  }



  getDepartmentRequests(department: string) {
    let stafflist = _.filter(this.db.leaveHistory, { 'department': department })
    return stafflist
  }

  getLeaveRequests() {


    let leaveReq: any = _.filter(this.db.leaveHistory, {'leaveStatus': 'Pending'}).concat(_.filter(this.db.leaveHistory, {'leaveStatus': 'Rejected'}))
    console.log(leaveReq)
    return leaveReq;
  }

getUsers() {
  let users: any = this.db.users
  console.log(users)
  return users;
  }
  


}
