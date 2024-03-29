import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TimeTableComponent } from './timeTableComponent/timeTableComponent.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TimeTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'reaction-time';
}
