import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';  //Displays the application component for the active URL. Manages navigation from one component to the next.
import {AuthService} from '../../service/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {


  currentUser: any;

        constructor(
          private router:Router,    //add "Router" for the constructor and register router ,then manages navigation through router
          private authService:AuthService,
          private flashMessage: FlashMessagesService,
        ) { }

        ngOnInit() {      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.

            if(this.authService.loggedIn()){
              this.authService.retreiveProfile().subscribe(res => {
                this.currentUser = res;
              });
            }
        }


        /**
         *clear local storage by calling the logOutUser() function in authService and
         * navigate to login page
         */
        logOut(){
            this.authService.logOutUser();
            this.flashMessage.show('you are Logged out!', {cssClass: 'alert-success', timeout: 2000});
            this.router.navigate(['/login']);
            return false;
        }
}
