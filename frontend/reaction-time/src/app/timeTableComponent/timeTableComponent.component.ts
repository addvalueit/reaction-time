import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {ReactionTimeComponent} from '../reactionTimeComponent/reactionTimeComponent.component';
import {environment} from '../../environments/environment';

@Component({
  selector: 'time-table',
  standalone: true,
  imports: [NgForOf, ReactionTimeComponent, NgIf],
  templateUrl: './timeTableComponent.component.html',
  styleUrl: './timeTableComponent.component.css'
})
export class TimeTableComponent implements OnInit, OnDestroy {

  userId!: number;
  intervalId: any;

  leaderboard: { name: string, time: number }[] = [];

  constructor(private http: HttpClient, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.userId = parseInt(this.route.snapshot.paramMap.get('id')!);

    this.fetchResult();
    this.intervalId = setInterval(() => this.fetchResult(), 5000);

  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  topNLeaderboard(n: number) {
    let playerNames = [...new Set(this.leaderboard.map(value => value.name))];

    let topTimeForPlayer: { name: string, time: number }[] = [];

    for (let i = 0; i < playerNames.length; i++) {
      let playerTimes: number[] = this.leaderboard.filter(value => value.name === playerNames[i]).map(value => value.time);
      let bestTime = Math.min(...playerTimes);
      topTimeForPlayer = [...topTimeForPlayer, {name: playerNames[i], time: bestTime}];
    }

    return topTimeForPlayer.sort((a, b) => a.time - b.time).slice(0, n);
  }

  fetchResult() {
    this.http.post<any[]>(environment.recuperoUrl, null).subscribe(response => {
        console.log(response);
        this.leaderboard = response.map(value => {
          return {
            name: value.name,
            time: value.time
          };
        });
      }
    );
  }

}

