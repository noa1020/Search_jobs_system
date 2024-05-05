import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from '../models/user.model';
import { Observable, Subject, catchError, of, tap, throwError } from 'rxjs';
import { json } from 'express';


@Injectable({
    providedIn: 'root'
})

export class UserService {
    
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
                    else{
                    return throwError(error);
                    }
                })
            );
    }

    addUser(user: User) {
        this.http.post('https://localhost:7231/User', { body: user }).subscribe(res => { });
    }

    updateUser(user:User){
        this.http.put('https://localhost:7231/User', user).subscribe(res => { });
        localStorage.setItem("user", JSON.stringify(user));
        this.userUpdated.next(user);
    }   
    addJob(idJob:number ){
        this.user = JSON.parse(localStorage.getItem("user") || '{}');
        this.user.cVsSentCount += 1;
        console.log(this.user.cVsSentIdsJobs);
        
        this.user.cVsSentIdsJobs.push(idJob);
        this.updateUser(this.user);
    }
}
