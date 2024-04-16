import {Component, OnInit} from '@angular/core';
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
export class TimeTableComponent implements OnInit {

  userId!: number;

  leaderboard: { name: string, time: number }[] = [];


  constructor(private http: HttpClient, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.userId = parseInt(this.route.snapshot.paramMap.get('id')!);

    this.fetchResult();
    setInterval(() => this.fetchResult(), 3000);

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

