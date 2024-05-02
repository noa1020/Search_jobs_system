import { Injectable } from '@angular/core';
import { UserService } from './User.Service';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private userService: UserService) { }

  async Login(username: string, password: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      let flag = false;
      this.userService.GetUser(username, password).subscribe((user: User | null) => {
        if (user !== null) {
          localStorage.setItem("user", JSON.stringify(user));
          flag = true;
        }
        resolve(flag);
      });
    });
  }
}  

