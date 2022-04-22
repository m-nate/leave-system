import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../api.service';
import { LoginComponent } from '../login/login.component';

@Component({
    // selector: 'app-employee',
    selector: 'employee-login',
    templateUrl: './employee.component.html',
    styleUrls: ['employee.component.css'],
    providers: [LoginComponent]
})
export class EmployeeComponent implements OnInit {

    constructor(private router: Router, private api: ApiService) { }

    leave: any[] = [];
    columns: any[] = [
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
    ngOnInit() {
        this.username = (sessionStorage.getItem('loggedUser')!)
    }

    logOut(): void {
        console.log('clicked back')
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

    goToLeave(): void {
        this.show = false
        console.log("worked")
        this.router.navigate(['leave-page']);
    }
}


