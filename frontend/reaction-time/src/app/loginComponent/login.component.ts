import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {NgForOf} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'login',
  standalone: true,
  imports: [NgForOf, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userName: string = '';

  constructor(private http: HttpClient, private router: Router) {
  }


  insertUser(userName?: string) {
    console.log('inserimento utente in corso...');
    let payload = {'name': userName ? userName : 'Nicholas'};
    this.http.post<{ 'user-id': number, 'message': string }>(
      'http://localhost:4566/2015-03-31/functions/login_api/invocations', payload)
      .subscribe((data) => {
        const userID = data['user-id'];
        console.log('data! ', data);
        if (userID) {
          this.router.navigate(['/time-table/', userID]);
        }
      });
  }
}

