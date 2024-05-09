import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User = {
    userId: 0,
    userName: '',
    password: '',
    jobFieldId: 0,
    cVsSentCount: 0,
    cVsSentIdsJobs: []
  };

  constructor(private userService: UserService) { }

  async login(username: string, password: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      let flag = false;
      this.userService.getUser(username, password).subscribe((user: User | null) => {
        if (user !== null) {
          localStorage.setItem("user", JSON.stringify(user));
          flag = true;
        }
        resolve(flag);
      });
    });
  }

  async signUp(username: string, password: string, jobFieldId: number): Promise<boolean> {
    this.user.userName = username;
    this.user.password = password;
    this.user.jobFieldId =parseInt(jobFieldId.toString());
    return new Promise<boolean>((resolve, reject) => {
      this.userService.addUser(this.user).subscribe(
        (res: any) => {
          if (res === true) {
            localStorage.setItem("user", JSON.stringify(this.user));
            resolve(true);
          } else if (res === false) {
            resolve(false);
          }
          else {
            reject(res.error);
          }
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
