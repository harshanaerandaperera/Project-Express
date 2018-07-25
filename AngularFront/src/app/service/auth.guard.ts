import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {   //To guard controller that should be limited to authenticated users, set up an AuthGuard. refer doc https://www.npmjs.com/package/angular2-jwt under "Checking Authentication to Hide/Show Elements and Handle Routing"

  constructor(private auth: AuthService,
              private router: Router
  ) {
  }

  canActivate() {
    if(this.auth.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['unauthorized']);
      return false;
    }
  }
}
