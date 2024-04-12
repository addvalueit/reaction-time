import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NgForOf} from "@angular/common";
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'login',
  standalone: true,
  imports: [RouterOutlet, NgForOf, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
@Injectable()
export class LoginComponent implements OnInit {
  userName: string = "";
  userID: number = 0;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }

  insertUser(userName?: string) {
    console.log("inserimento utente in corso...");
    let payload = { "name": userName ? userName : "Nicholas" };
    this.http.post<{ "body": { "user-id": number, "message": string }, "statusCode": number }>('http://localhost:4566/2015-03-31/functions/login_api/invocations', payload).subscribe((data) => {
      this.userID = data.body["user-id"];
      console.log("data! ",data, data.body, data.body["user-id"]);
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

