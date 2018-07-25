import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  currentUser:any;

  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.authService.retreiveProfile().subscribe(res=>{
      this.currentUser=res;
    });
  }
}
