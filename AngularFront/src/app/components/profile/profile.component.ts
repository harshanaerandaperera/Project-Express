import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {

    btnstatus: String;
    currentUser: any;
    name: String;
    skills: String;

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
    }

    deleteUsr(email) {
        if (this.currentUser.projectCount == 0) {
            this.authService.deleteUserByemail(email).subscribe(res => {
                this.authService.logOutUser();
                this.flashMessage.show('Successfully Deleted your account!!', {
                    cssClass: 'alert-success',
                    timeout: 2000
                });
                this.router.navigate(['/register']);
            });
        } else {
            this.flashMessage.show('Sorry,You cannot delete your account,You have Participatory Projects', {
                cssClass: 'alert-danger',
                timeout: 2000
            });
        }
    }


    changestatustodisplayupdateaccountform() {
        this.btnstatus = "updatepro";
    }

    checkstatustodisplayupdateform() {
        if (this.btnstatus == "updatepro") {
            return true;
        }
    }

    updateaccount(email) {
        const updateprofiledetails = {
            name: this.name,
            skills: this.skills,
            email: email
        };
        this.authService.updateUserByEmail(updateprofiledetails).subscribe(res => {
            this.router.navigate(['/dashboard']);
            this.flashMessage.show('Successfully Updated your account!!', {cssClass: 'alert-success', timeout: 2000});
        });
    }

    formValidateUpdateProfile() {
        if (this.name == null || this.skills == null) {
            return true;
        }
    }


}