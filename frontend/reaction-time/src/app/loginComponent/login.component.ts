import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NgForOf} from "@angular/common";
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'login',
  standalone: true,
  imports: [RouterOutlet, NgForOf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
@Injectable()
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }

  insertUser(userName?: string) {
    console.log("inserimento utente in corso...");
    let data = { "name": userName ? userName : "Nicholas" };
    this.http.post<any[]>('http://localhost:4566/2015-03-31/functions/login_api/invocations', data).subscribe(() => {
        console.log("fatto!");
    })
  }


  insertTime() {
    console.log("inserimento tempo in corso...");
    let data = { "user-id": 1, "time": 2345 };
    this.http.post<any[]>('http://localhost:4566/2015-03-31/functions/inserimento_api/invocations', data).subscribe(() => {
        console.log("fatto!");
    })
  }
}

