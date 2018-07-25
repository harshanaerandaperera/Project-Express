import { Component } from '@angular/core';

@Component({
  selector: 'app-root',                 //there is a selecter called app-root
  templateUrl: './app.component.html', //Load app.component.html data  to app-root tag( <app-root></app-root> )
  styleUrls: ['./app.component.css']    //app.component.css is the required css file for app.component.html
})
export class AppComponent {
  title = '27045240';
}
