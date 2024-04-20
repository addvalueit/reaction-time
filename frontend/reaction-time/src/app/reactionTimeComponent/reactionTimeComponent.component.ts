import {Component, Input} from '@angular/core';
import {NgClass, NgIf, NgStyle} from '@angular/common';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'reaction-time',
  standalone: true,
  templateUrl: './reactionTimeComponent.component.html',
  imports: [
    NgStyle,
    NgIf,
    NgClass
  ],
  styleUrl: './reactionTimeComponent.component.css'
})
export class ReactionTimeComponent {
  @Input() userId!: number;

  state: 'NOT_STARTED' | 'STARTED' | 'MUST_CLICK' | 'TOO_SOON' | 'RESULT' = 'NOT_STARTED';

  start!: Date;
  result!: number;

  minTime = 1000;
  maxTime = 5000;

  constructor(private http: HttpClient) {
  }

  handleStart() {
    this.state = 'STARTED';
    this.startRandomInterval();
  }

  handleStop() {
    const end = new Date();
    this.result = end.getTime() - this.start.getTime();
    this.state = 'RESULT';
  }

  handleTooSoon() {
    this.state = 'TOO_SOON';
  }

  handleSendAndStart() {
    this.insertTime();
    this.handleStart();
  }

  private startRandomInterval() {
    setTimeout(() => {
      if (this.state === 'STARTED') {
        this.state = 'MUST_CLICK';
        this.start = new Date();
      }
    }, this.randomInterval(this.minTime, this.maxTime));
  }

  private randomInterval(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  insertTime() {
    console.log('inserimento tempo in corso...');
    let data = {'user-id': this.userId, 'time': this.result};
    this.http.post<any[]>('http://localhost:4566/2015-03-31/functions/inserimento_api/invocations', data).subscribe(() => {
      console.log('fatto!');
    });
  }

  handleClick(state: "NOT_STARTED" | "STARTED" | "MUST_CLICK" | "TOO_SOON" | "RESULT") {
    if (state === 'NOT_STARTED') {
      this.handleStart();
    } else if (state === 'STARTED') {
      this.handleTooSoon();
    } else if (state === 'MUST_CLICK') {
      this.handleStop();
    } else if (state === 'RESULT') {
      this.handleSendAndStart();
    } else if (state === 'TOO_SOON') {
      this.handleStart();
    }
  }
}
