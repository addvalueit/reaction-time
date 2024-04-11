import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NgForOf} from "@angular/common";
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'time-table',
  standalone: true,
  imports: [RouterOutlet, NgForOf],
  templateUrl: './timeTableComponent.component.html',
  styleUrl: './timeTableComponent.component.css'
})
@Injectable()
export class TimeTableComponent implements OnInit {
  response: any;

  leaderboard = [
    {
      name: "Marcello",
      time: 0.00198
    },
    {
      name: "Kevin",
      time: 1.3
    },
    {
      name: "Nicholas",
      time: 0.001
    }
  ]

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.http.post<any[]>('http://localhost:4566/2015-03-31/functions/recupero_api/invocations', null).subscribe((data: any[]) => {
        this.response = data;
        let timeArray = Object.values(this.response.body || {});
        this.leaderboard = timeArray.map((item: any) => {
          return {
            name: item.name,
            time: item.time
          }
        })
      },
      error => {
        console.log(error);
      });


  }
}

