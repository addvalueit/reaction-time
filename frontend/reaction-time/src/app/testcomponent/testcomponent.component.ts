import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'testcomponent',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './testcomponent.component.html',
  styleUrl: './testcomponent.component.css'
})
export class TestComponent {
  title = 'reaction-time';
}
