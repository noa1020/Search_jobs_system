import { Injectable } from '@angular/core';
import { UserService } from './User.Service';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private userService: UserService) {}

  login(username: string, password: string): boolean {
    const user= this.authenticate(username, password);
    if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        return true;
    } else {
        return false;
    }
  }

  authenticate(username: string, password: string): User | undefined {
    const userList = this.userService.GetUserList();
    const user = userList.find(u => u.UserName === username && u.Password === password);
    return user; 
  }
}
