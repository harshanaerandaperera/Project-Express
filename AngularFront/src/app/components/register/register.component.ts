import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../service/auth.service';
import{Router} from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})

export class RegisterComponent implements OnInit {

  username:String;      //define data types
  name:String;
  email:String;
  password:String;
  projectCount:Number=0;
  role:String="user";

  constructor(
    private authService:AuthService,
    private router:Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  registerData(){

   // console.log("Accessed to register Data Function in register component");
    const user={
      username:this.username,     //here this.username is the register.component.html's  [(ngModel)]="username"  get data from input field
      name:this.name,             //here this.name is the register.component.html's  [(ngModel)]="name"  get data from input field
      email:this.email,
      password:this.password,
      role:this.role,
      projectCount:this.projectCount

    };

   //  console.log(user);    //print the currentUser object(get data from all input fields in the register form and console eg.getText in java)
    //console.log("Input field username = "+this.username);
     this.authService.registerUser(user).subscribe(res=>{      //pass the currentUser object to registerUser method which send data to "http://localhost:3000/user/register"    //In  registerUser there is a respond so we can subscribe

     //  console.log(res);     //print the respond coming from backend's controller/userController.js saveUser method's json respond

       if(res.state){
         this.flashMessage.show('you are registered!', { cssClass: 'alert-success', timeout: 2000 });
         this.router.navigate(['/login']);    //if backend's responds state become true,then navigate to http://localhost:4200/login
       }else {
         this.flashMessage.show('Something went wrong!', { cssClass: 'alert-danger', timeout: 2000 });
         this.router.navigate(['/register']);
       }

    });
  }
}
