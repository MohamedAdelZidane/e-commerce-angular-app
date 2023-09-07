import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  private isLoggedSubject: BehaviorSubject<boolean>;
  constructor() {
    this.isLoggedSubject = new BehaviorSubject<boolean>(this.isUserLogged);
  }

  login(username: string, password: string) {
    let userToken = '123456789'
    localStorage.setItem("token", userToken);
    this.isLoggedSubject.next(true)
    // console.log(isLoggedSubject);

  }

  logout() {
    localStorage.removeItem("userCredentials")
    localStorage.removeItem("token")
    this.isLoggedSubject.next(false)
  }

  get isUserLogged(): boolean {
    // return localStorage.getItem('token') ? true : false
    return localStorage.getItem('userCredentials') ? true : false

  }

  getloggedStatus(): Observable<boolean> {
    return this.isLoggedSubject.asObservable();
  }
}
