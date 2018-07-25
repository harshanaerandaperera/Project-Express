import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {Myprojects} from "../projectlog/myprojects";


@Component({
  selector: 'app-projectlog',
  templateUrl: './projectlog.component.html',
})
export class ProjectlogComponent implements OnInit {

  currentUser:any;
  managerProjects: Myprojects[] = [];

  constructor(
    private authService:AuthService
  ) { }

  ngOnInit() {
    this.authService.retreiveProfile().subscribe(res => {
      this.currentUser = res;

        this.authService.getProjectsByManagerEmail({email:this.currentUser.email}).subscribe(res=>{
          this.managerProjects=res;
        });

    });
  }

}
