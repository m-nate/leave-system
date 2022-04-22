import { Component } from '@angular/core'
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

import * as _ from 'lodash'

@Component({
    // selector: 'app-leave',
    selector: 'leave-page',
    templateUrl: './leave.component.html'
    // styleUrls: ['./leave.component.css']
})
export class LeaveComponent {
    username: string = sessionStorage.getItem('loggedUser')!;
    leaveType: string = "";
    leaveReason: string = "";

    constructor(private router: Router, private api: ApiService) { }

    today = new Date();
    // tomorrow = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 1).toISOString().slice(0, 10);
    startDate = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 1).toISOString().slice(0, 10);
    endDate = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 1).toISOString().slice(0, 10);

    onUpdateStartDate(event: any): void {
        this.startDate = event.target.value
        console.log(this.startDate)
    };

    onUpdateEndDate(event: any): void {
        this.endDate = event.target.value
        console.log(this.endDate)
    };

    onUpdateLeaveType(event: any): void {
        this.leaveType = event.target.value
    }


    submit(): void {
        let leaveLeft = _.find(this.api.db.users, {'username': this.username}).leave_days_left
        let leaveLength = ((new Date(this.endDate)).getTime() - (new Date(this.startDate)).getTime()) / (1000 * 3600 * 24)
        if(leaveLength>leaveLeft)
        {
            alert(`You do not have enough leave!`)
        }
        else{
        
        if (confirm(`Request ${leaveLength} days of leave?`)) {
            let leaveDetails = {
                username: this.username,
                dateTaken: new Date(this.startDate),
                endDate: new Date(this.endDate),
                daysTaken: leaveLength,
                leaveType: this.leaveType,
                leaveStatus: "Pending"
            }
            console.log(leaveDetails)
            this.router.navigate(['employee']);
            // let leaveHistory = _.find(this.api.db.leaveTable, { 'username': this.username })
            // leaveHistory.leaveHistory.push(leaveDetails)
            this.api.db.leaveHistory.push(leaveDetails)
            //pass leaveStart, leaveLength and leaveType
        }
    }
    }

    back(): void {
        console.log('clicked back')
        this.router.navigate(['employee'])
    }
}


