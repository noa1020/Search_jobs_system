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
        return this.http.get<User>(`this.userUrl/Login?userName=${encodeURIComponent(userName)}&password=${encodeURIComponent(password)}`)
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

    updateUser(user: User) {
        this.http.put(this.userUrl, user).subscribe(res => { });
        localStorage.setItem("user", JSON.stringify(user));
        this.userUpdated.next(user);
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
