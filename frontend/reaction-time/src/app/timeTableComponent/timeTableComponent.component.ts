import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {ReactionTimeComponent} from '../reactionTimeComponent/reactionTimeComponent.component';

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

  // define a leaderboard top 5 peoples with the best time for each user (as a lambda function)
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

  maxTopNLeaderboardTime(n: number) {
    return Math.max(...this.topNLeaderboard(n).map(value => value.time));
  }


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

  fetchResult() {
    this.http.post<any[]>('http://localhost:4566/2015-03-31/functions/recupero_api/invocations', null).subscribe(response => {
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

