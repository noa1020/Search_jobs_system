import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { FieldJob } from '../Models/FieldJob';
import { Observable, catchError, of, tap, throwError } from 'rxjs';


@Injectable({
    providedIn: 'root'
})

export class FieldJobService {
    constructor(private http: HttpClient) {
    }

    FieldJobList: FieldJob[] = []

    GetFieldJobs() {
        this.http.get('https://localhost:7231/Jobfield').subscribe((res: any) => this.FieldJobList = res)
    }

    GetFieldJobById(fieldJobId: number):Observable<FieldJob | null > {
        return this.http.get<FieldJob>(`https://localhost:7231/Jobfield/${encodeURIComponent(fieldJobId)}`)
            .pipe(
                catchError(error => {
                    if (error.status === 404) {
                        return of(null);
                    }
                    return throwError(error);
                })
            );
    }
    



addFieldJob(fieldJob: FieldJob) {
    this.FieldJobList.push(fieldJob)
    this.http.post('https://localhost:7231/Job', { body: fieldJob }).subscribe(res => { })
}


}
