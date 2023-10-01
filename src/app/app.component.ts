import { Component, OnInit } from '@angular/core';
import { SpinnerService } from './shared/spinner.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MyTechnicalTestApp';

  constructor(public spinnerService: SpinnerService){
 
  }

}
