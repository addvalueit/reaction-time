import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'time-table',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './timeTableComponent.component.html',
  styleUrl: './timeTableComponent.component.css'
})
export class TimeTableComponent {
  title = 'reaction-time';
}
