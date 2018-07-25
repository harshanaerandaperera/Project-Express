import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {AuthService} from "../../service/auth.service";
import {Task} from "../addproject/task";
import {Member} from "../addproject/member";

@Component({
    selector: 'app-addproject',
    templateUrl: './addproject.component.html',
})
export class AddprojectComponent implements OnInit {

    projectTitle: String;        //define data types
    projectStartDate: Date;
    projectDeadLine: Date;
    projectDetails: String;
    projectManger: String;

    currentUser: any;
    currentProjectID: String;

    htmlStatus: string;

    taskTitle: String;
    taskDeadLine: Date;
    taskStartDate: Date;
    taskDetails: String;
    projectTasks: Task[] = [];
    Members: Member[] = [];
    selectedMemberEmails: Member[] = [];

    constructor(
        private authService: AuthService,
        private router: Router,
        private flashMessage: FlashMessagesService
    ) {
    }

    ngOnInit() {
        this.authService.retreiveProfile().subscribe(res => {
            this.currentUser = res;
        });

        this.authService.retreiveAllUsers().subscribe(res => {
            this.Members = res;
            // console.log(this.Members);
        });
    }

    addTaskToArr() {
        if (this.taskStartDate > this.taskDeadLine) {
            this.flashMessage.show('DeadLine date should be greater than Task Start Date !', {
                cssClass: 'alert-danger',
                timeout: 2000
            });
        }else{
            const T = {
                taskTitle: this.taskTitle,
                taskDeadLine: this.taskDeadLine,
                taskStartDate: this.taskStartDate,
                taskDetails: this.taskDetails,
            };
            this.projectTasks.push(T);
        }
    }

    addMembersToArr(email, projectCount, name) {
        this.selectedMemberEmails.push({email: email, projectCount: projectCount + 1, name: name});
        //console.log(this.selectedMemberEmails);
    }

    clearTaskFromArr() {
        this.projectTasks = [];
    }


    changeStatusAddProjectToAddTasks() {
        if (this.htmlStatus == "true") {
            return true;
        }
    }

    changeStatusAddTasksToAddMembers() {
        if (this.htmlStatus == "memberTrue") {
            return true;
        }
    }


    addProject() {
        if (this.projectStartDate > this.projectDeadLine) {
            this.flashMessage.show('DeadLine date should be greater than Project Start Date !', {
                cssClass: 'alert-danger',
                timeout: 2000
            });
        } else {
            const project = {
                projectTitle: this.projectTitle,   //here this.projectTitle is the addproject.component.html's  [(ngModel)]="projectTitle"  get data from input field
                projectStartDate: this.projectStartDate,
                projectDeadLine: this.projectDeadLine,
                projectManger: this.currentUser.email,    //get current users email from the session and make him project manager
                projectDetails: this.projectDetails,
            };

            //console.log(project);    //print the project object(get data from all input fields in the addproject form and console eg.getText in java)
            this.authService.createProject(project).subscribe(res => {      //pass the project object to createProject method which send project to "http://localhost:3000/project/addproject"    //In  createProject there is a respond so we can subscribe

                if (res.state) {
                    this.flashMessage.show('project added successfully!', {cssClass: 'alert-success', timeout: 2000});
                    this.currentProjectID = res.project._id;
                    this.htmlStatus = "true";

                } else {
                    this.flashMessage.show('Something went wrong!', {cssClass: 'alert-danger', timeout: 2000});
                    this.router.navigate(['/addproject']);
                }
            });
        }
    }


    addTask() {
        if (this.taskStartDate > this.taskDeadLine) {
            this.flashMessage.show('DeadLine date should be greater than Task Start Date !', {
                cssClass: 'alert-danger',
                timeout: 2000
            });
        }else{
            const task = {
                id: this.currentProjectID,
                projectTasks: this.projectTasks,
            };

            this.authService.createTasks(task).subscribe(res => {
                if (res.state) {
                    this.flashMessage.show('Tasks added successfully!', {cssClass: 'alert-success', timeout: 2000});
                    this.clearTaskFromArr();
                    this.htmlStatus = "memberTrue";
                } else {
                    this.flashMessage.show('Something went wrong!', {cssClass: 'alert-danger', timeout: 2000});
                }
            });
        }
    }


    AvoidCurrentUserInAddMembers(email) {
        if (this.currentUser.email == email) {
            return true;
        }
    }

    AvoidAddingSameMember(SelectingEmails){
        var i=0;
        for(i;i<this.selectedMemberEmails.length;i++){
            if(SelectingEmails==this.selectedMemberEmails[i].email){
                return true;
            }
        }
    }

    formValidateAddNewTask() {
        if (this.taskTitle == null || this.taskDeadLine == null || this.taskStartDate == null || this.taskDetails == null) {
            return true;
        }
    }

    addMembers() {
        const memData = {
            id: this.currentProjectID,
            projectMembersEmail: this.selectedMemberEmails
        };

        this.authService.createMembers(memData).subscribe(res => {
            if (res.state) {
                this.flashMessage.show('Members added successfully!', {cssClass: 'alert-success', timeout: 2000});
                this.router.navigate(['/dashboard']);
            } else {
                this.flashMessage.show('Something went wrong!', {cssClass: 'alert-danger', timeout: 2000});
            }
        });
    }
}
