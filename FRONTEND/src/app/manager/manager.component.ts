import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../api.service';
// import { LoginComponent } from '../login/login.component';
// import { EmployeeComponent } from '../employee/employee.component';

import * as _ from 'lodash'

@Component({
    // selector: 'app-manager',
    selector: 'manager-login',
    templateUrl: './manager.component.html',
    styleUrls: ['./manager.component.css'],
    // providers: [LoginComponent]
})
export class ManagerComponent implements OnInit {
    leave: any[] = [];
    columns: any[] = [
        { header: "Leave ID", field: "leaveId" },
        { header: "User", field: "username" },
        { header: "Start Date", field: "dateTaken" },
        { header: "End Date", field: "dateTaken" },
        { header: "Days taken", field: "daysTaken" },
        { header: "Type of leave", field: "leaveType" },
        { header: "Leave Status", field: "leaveStatus" }
    ] //"Approved by"

    show: boolean = false;
    tbl: boolean = false;
    leaveDays: number = 0;
    username: string = "";
    leaveID: string = "-1";


    constructor(private router: Router, private api: ApiService) { }



    ngOnInit() {
        this.username = (sessionStorage.getItem('loggedUser')!)
    }

    logOut(): void {
        console.log('clicked logout')
        sessionStorage.clear()
        this.router.navigate(['login'])
    }

    getLeaveDaysLeft(): void {
        this.show = true
        this.leaveDays = this.api.getLeaveDays(this.username);
    }

    getLeaveHistory(): void {
        this.show = false
        this.tbl = true
        //do var and call property {{}}}
        this.leave = this.api.getLeaveHistory(this.username)
        console.log(this.leave)
    }

    viewLeaveRequests(): any {
        this.tbl = true
        console.log(`this is ${this.leave}`)
        // let dept = (_.find(this.api.db.users, { 'username': this.username })).department
        this.leave = this.api.getDepartmentRequests(_.find(this.api.db.users, { 'username': this.username }).department)
        console.log(this.leave)
    }

    approve(): void {
        if (Number(this.leaveID) > -1) {
            let arrIndex = this.api.db.leaveHistory.findIndex(((obj: { leaveId: string; }) => obj.leaveId == this.leaveID));
            this.api.db.leaveHistory[arrIndex].leaveStatus = "Approved"
        }
        else {
            alert(`You've entered an incorrect leave ID!`)

            console.log(this.leaveID)
        }
    }
}
