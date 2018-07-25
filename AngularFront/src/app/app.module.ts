import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';  //RouterModule = A separate NgModule that provides the necessary service providers and directives for navigating through application views.
import {Routes} from '@angular/router';        //Routes = Defines an array of Routes, each mapping a URL path to a component.
import {FormsModule} from '@angular/forms'    //FormsModule is required to use ngModel
import {HttpModule} from '@angular/http';
import { FlashMessagesModule } from 'angular2-flash-messages';    //import angular2-flash-messages refer the doc at https://www.npmjs.com/package/angular2-flash-messages


import { AppComponent } from './app.component';         //run  AppComponent
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AddprojectComponent } from './components/addproject/addproject.component';
import { EditprojectComponent } from './components/editproject/editproject.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProjectlogComponent } from './components/projectlog/projectlog.component';
import { ParticipatoryprojectsComponent } from './components/participatoryprojects/participatoryprojects.component';
import { DeadlinesandtasksComponent } from './components/deadlinesandtasks/deadlinesandtasks.component';



import {AuthService} from './service/auth.service';     //import AuthService
import {AuthGuard} from './service/auth.guard';
import { FlashMessagesService } from 'angular2-flash-messages/module/flash-messages.service';








const appRoutes:Routes =[                        //Configures controller for the application & Defines an array of Routes         //refer  https://angular.io/guide/cheatsheet under Routing and navigation
  {path:'',component:LoginComponent},           // if my path is http://localhost:4200/ then load the LoginComponent
  {path:'login',component:LoginComponent},      //if my path is http://localhost:4200/login then load the LoginComponent
  {path:'register',component:RegisterComponent},  //if my path is http://localhost:4200/register then load the RegisterComponent
  {path:'profile',component:ProfileComponent,canActivate:[AuthGuard]},
  {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard]},
  {path:'addproject',component:AddprojectComponent,canActivate:[AuthGuard]},
  {path:'editproject',component:EditprojectComponent,canActivate:[AuthGuard]},
  {path:'projectlog',component:ProjectlogComponent,canActivate:[AuthGuard]},
  {path:'participatoryprojects',component:ParticipatoryprojectsComponent,canActivate:[AuthGuard]},
  {path:'deadlinesandtasks',component:DeadlinesandtasksComponent,canActivate:[AuthGuard]}

];

@NgModule({
  declarations: [       //List of components, directives, and pipes that belong to this module.
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    DashboardComponent,
    FooterComponent,
    AddprojectComponent,
    ProjectlogComponent,
    ParticipatoryprojectsComponent,
    DeadlinesandtasksComponent,
    EditprojectComponent,

  ],
  imports: [            //List of modules to import into this module
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpModule,
    FormsModule,        //Before using the ngModel directive in a two-way data binding, you must import the FormsModule and add it to the NgModule's imports list
    FlashMessagesModule
  ],
  providers: [AuthService,AuthGuard,FlashMessagesService],       //add services
  bootstrap: [AppComponent]       //List of components to bootstrap when this module is bootstrapped.
})
export class AppModule { }
