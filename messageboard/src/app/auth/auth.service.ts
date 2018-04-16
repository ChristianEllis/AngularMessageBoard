//Library Imports
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

//Custom Components
import { User } from './user.model';
import { ErrorService } from '../errors/error.service';

@Injectable() //For HTTP service (inject a service in a service)
export class AuthService {

  constructor(private http: Http, private errorService: ErrorService) {
  }

  signup(user:User) {
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:3000/user', body, {headers: headers})
    .map((response: Response) => response.json()) //transform data
    .catch((error: Response) => {
      this.errorService.handleError(error.json());
      return Observable.throw(error.json())
    }); //turn into observable then throw error
  }

  signin(user:User) {
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:3000/user/signin', body, {headers: headers})
    .map((response: Response) => response.json()) //transform data
    .catch((error: Response) => {
      this.errorService.handleError(error.json());
      return Observable.throw(error.json())
    }); //turn into observable then throw error
  }

  logout() {
    localStorage.clear();
  }

  isLoggedIn(){
    return localStorage.getItem('token') !== null;
  }
}
