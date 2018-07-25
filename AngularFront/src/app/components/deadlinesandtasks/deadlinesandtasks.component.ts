import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {Deadlinetask} from "../deadlinesandtasks/deadlinetask";
import {Taskinfo} from "../deadlinesandtasks/taskinfo";

@Component({
  selector: 'app-deadlinesandtasks',
  templateUrl: './deadlinesandtasks.component.html',
})
export class DeadlinesandtasksComponent implements OnInit {

  currentUser:any;
  deadlinetask: Deadlinetask[] = [];
  taskInfo:Taskinfo[]=[];

  constructor(
    private authService:AuthService
  ) { }


  ngOnInit() {
    this.authService.retreiveProfile().subscribe(res => {
      this.currentUser = res;
      this.authService.getProjectsByMemberEmail({email:this.currentUser.email}).subscribe(res=>{
        this.deadlinetask=res;

        for(var i=0;i<this.deadlinetask.length;i++){
          for(var j=0;j<this.deadlinetask[i].projectTasks.length;j++){
            this.taskInfo.push({projectTitle:this.deadlinetask[i].projectTitle,taskTitle:this.deadlinetask[i].projectTasks[j].taskTitle,taskDetails:this.deadlinetask[i].projectTasks[j].taskDetails,taskDeadLine:this.deadlinetask[i].projectTasks[j].taskDeadLine});
          }
        }
      });
    });
  }
}
