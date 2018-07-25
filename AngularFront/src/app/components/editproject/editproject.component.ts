import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Editproject} from "../editproject/editproject";
import {Edittask} from "./edittask";

@Component({
    selector: 'app-editproject',
    templateUrl: './editproject.component.html',
})
export class EditprojectComponent implements OnInit {

    currentUser: any;
    currentProjectID: String;

    managerProjects: Editproject[] = [];
    status: String;
    selectedprojectid: String;
    projectDeadLine: Date;

    taskTitle: String;
    taskDeadLine: Date;
    taskStartDate: Date;
    taskDetails: String;
    projectTasks: Edittask[] = [];

    constructor(
        private authService: AuthService,
        private router: Router,
        private flashMessage: FlashMessagesService
    ) {
    }

    ngOnInit() {
        this.authService.retreiveProfile().subscribe(res => {
            this.currentUser = res;

            this.authService.getProjectsByManagerEmail({email: this.currentUser.email}).subscribe(res => {
                this.managerProjects = res;
            });
        });
    }


    updateDeadLine() {
        this.authService.updateProjectDeadLineByProjectId(this.selectedprojectid, {projectDeadLine: this.projectDeadLine}).subscribe(res => {
            if (res.state) {
                this.flashMessage.show('Project Deadline Updated successfully!', {
                    cssClass: 'alert-success',
                    timeout: 2000
                });
                this.router.navigate(['/dashboard']);
            }
        });
    }


    addTask() {
        if (this.taskStartDate > this.taskDeadLine) {
            this.flashMessage.show('DeadLine date should be greater than Task Start Date !', {
                cssClass: 'alert-danger',
                timeout: 2000
            });
        } else {
            const task = {
                id: this.currentProjectID,
                projectTasks: this.projectTasks,
            };

            this.authService.createTasks(task).subscribe(res => {
                if (res.state) {
                    this.flashMessage.show('Tasks added successfully!', {cssClass: 'alert-success', timeout: 2000});
                    this.clearTaskFromArr();
                } else {
                    this.flashMessage.show('Something went wrong!', {cssClass: 'alert-danger', timeout: 2000});
                }
            });
        }
    }

    formValidate() {
        if (this.projectDeadLine == null) {
            return true;
        }
    }

    formValidateAddNewTask() {
        if (this.taskTitle == null || this.taskDeadLine == null || this.taskStartDate == null || this.taskDetails == null) {
            return true;
        }
    }

    changestatustodisplaychangedeadline(id) {
        this.status = "deadline";
        this.selectedprojectid = id;
    }

    changestatustodisplayaddtask(id) {
        this.status = "task";
        this.currentProjectID = id;
    }


    checkstatustodisplayaddtaskform() {
        if (this.status == "task") {
            return true;
        }
    }

    checkstatustodisplaychangedeadline() {
        if (this.status == "deadline") {
            return true;
        }
    }


    addTaskToArr() {
        if (this.taskStartDate > this.taskDeadLine) {
            this.flashMessage.show('DeadLine date should be greater than Task Start Date !', {
                cssClass: 'alert-danger',
                timeout: 2000
            });
        } else {
            const T = {
                taskTitle: this.taskTitle,
                taskDeadLine: this.taskDeadLine,
                taskStartDate: this.taskStartDate,
                taskDetails: this.taskDetails,
            };
            this.projectTasks.push(T);
        }

    }

    clearTaskFromArr() {
        this.projectTasks = [];
    }


}
