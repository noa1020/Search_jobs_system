import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from '../models/user.model';
import { Observable, Subject, catchError, map, of, tap, throwError } from 'rxjs';
import { json } from 'express';


@Injectable({
    providedIn: 'root'
})

export class UserService {
    private userUrl = 'https://localhost:7231/User'
    userUpdated = new Subject<User>();
    user!: User;
    constructor(private http: HttpClient) { }

    getUser(userName: string, password: string): Observable<User | null> {
        return this.http.get<User>(`https://localhost:7231/User/Login?userName=${encodeURIComponent(userName)}&password=${encodeURIComponent(password)}`)
            .pipe(
                catchError(error => {
                    if (error.status === 404) {
                        return of(null);
                    }
                    else {
                        return throwError(error);
                    }
                })
            );
    }

    addUser(user: User): Observable<any> {
        if (user !== null) {
            return this.http.post(this.userUrl, user).pipe(
                map(() => true),
                catchError(error => of(error))
            );
        }
        return of(false);
    }

    updateUserInServer(user: User): Observable<any> {
        if (user !== null) {
            return this.http.put(this.userUrl, user).pipe(
                tap(() => {
                    console.log(user);
                }),
                map(() => true),
                catchError(error => of(error))
            );
        }
        return of(false);
    }
    async updateUser(user: User): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.updateUserInServer(user).subscribe(
                (res: any) => {
                    if (res === true) {
                        localStorage.setItem("user", JSON.stringify(user));
                        this.userUpdated.next(user);    
                        resolve(true);
                    } else if (res === false) {
                        resolve(false);
                    }
                    else {
                        if (res['status'] == 400)
                            localStorage.removeItem("user");
                        reject(res);
                    }
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }



    addJobToUser(idJob: number): boolean {
        this.user = JSON.parse(localStorage.getItem("user") || '{}');
        if (this.user.cVsSentIdsJobs.indexOf(idJob) != -1)
            return false;
        this.user.cVsSentCount += 1;
        this.user.cVsSentIdsJobs.push(idJob);
        this.updateUser(this.user);
        return true;
    }
}
