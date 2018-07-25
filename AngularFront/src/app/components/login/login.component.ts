import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  email: String;
  password: String;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) {
  }

  ngOnInit() {
  }


  loginData() {
        const user = {
          email: this.email,       //here this.username is the login.component.html's  [(ngModel)]="email"  get data from input field
          password: this.password, //here this.name is the login.component.html's  [(ngModel)]="password"  get data from input field
        };

        this.authService.loginUser(user).subscribe(res => {
              if (res.state) {
                  this.authService.storeData(res.token);     //pass respond's token to the StoreData function in suthService
                  this.flashMessage.show('you are Logged in!', {cssClass: 'alert-success', timeout: 2000});
                  this.router.navigate(['/dashboard']);    //if backend's responds state become true,then navigate to http://localhost:4200/dashboard
              }
              else {
                  //if responds state is false then display responds message as a flash message
                  this.flashMessage.show(res.msg, {cssClass: 'alert-danger', timeout: 2000});
                  this.router.navigate(['/login']);
              }
        });
  }

}
