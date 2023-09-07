import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/Models/iuser';
import { UserAuthService } from 'src/app/Services/user-auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  isUserLogged: boolean = false
  userLoginForm: FormGroup;
  constructor(private authService: UserAuthService,
    private router: Router) {
    this.userLoginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.isUserLogged = this.authService.isUserLogged;
  }

  login() {
    // this.authService.login('user', 'user');
    let userModel: IUser = this.userLoginForm.value as IUser;
    console.log(userModel);
    this.authService.login(userModel.username, userModel.password)
    const obj = {
      username: userModel.username,
      password: userModel.password
    }
    localStorage.setItem("userCredentials", JSON.stringify(obj));
    this.isUserLogged = this.authService.isUserLogged;
    console.log(this.isUserLogged);
    this.router.navigate(['/Home']);
  }

  logout() {
    this.authService.logout();
    this.isUserLogged = this.authService.isUserLogged;
  }

  get fullName() {
    return this.userLoginForm.get('username')
  }
}
