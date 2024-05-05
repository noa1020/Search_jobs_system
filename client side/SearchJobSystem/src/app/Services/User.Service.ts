import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from '../models/user.model';
import { Observable, catchError, of, tap, throwError } from 'rxjs';


@Injectable({
    providedIn: 'root'
})

export class UserService {
    constructor(private http: HttpClient) { }

    GetUser(userName: string, password: string): Observable<User | null> {
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

    AddUser(user: User) {
        this.http.post('https://localhost:7231/User', { body: user }).subscribe(res => { })
    }


}
