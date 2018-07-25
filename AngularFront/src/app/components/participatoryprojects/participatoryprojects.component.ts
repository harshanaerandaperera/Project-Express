import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {Myprojects} from "../participatoryprojects/myprojects";

@Component({
  selector: 'app-participatoryprojects',
  templateUrl: './participatoryprojects.component.html',
})
export class ParticipatoryprojectsComponent implements OnInit {

  currentUser:any;
  memberProjects: Myprojects[] = [];

  constructor(
    private authService:AuthService
  ) { }

  ngOnInit() {
    this.authService.retreiveProfile().subscribe(res => {
      this.currentUser = res;

      this.authService.getProjectsByMemberEmail({email:this.currentUser.email}).subscribe(res=>{
        this.memberProjects=res;
      });

    });
  }

}
