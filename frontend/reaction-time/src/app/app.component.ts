import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TimeTableComponent } from './timeTableComponent/timeTableComponent.component';
import {HttpClientModule} from "@angular/common/http";
import {LoginComponent} from "./loginComponent/login.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TimeTableComponent, HttpClientModule, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'reaction-time';
}
