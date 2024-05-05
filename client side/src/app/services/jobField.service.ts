import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { JobField } from '../models/jobField.models';


@Injectable({
    providedIn: 'root'
})

export class JobFieldService {
    private jobFieldsUrl = 'https://localhost:7231/Jobfield';
    jobFieldList: JobField[] = []

    constructor(private http: HttpClient) { }

    public getJobFields(): Observable<JobField[]> {
        if (this.jobFieldList.length === 0) {
            return this.getJobFieldsFromServer();
        } else {
            return new Observable(observer => {
                observer.next(this.jobFieldList);
                observer.complete();
            });
        }
    }

    getJobFieldsFromServer(): Observable<JobField[]> {
        return this.http.get<JobField[]>(this.jobFieldsUrl).pipe(
            map(jobs => {
                this.jobFieldList = jobs;
                return jobs;

            })
        );

    }
    getJobFieldById(jobFieldId: number): Observable<JobField | undefined> {
        return this.getJobFields().pipe(
            map((jobFields: JobField[]) => jobFields.find(jobField => jobField.jobFieldId === jobFieldId))
        );
    }
        
    addJobField(jobField: JobField) {
        this.jobFieldList.push(jobField)
        this.http.post(this.jobFieldsUrl, { body: jobField }).subscribe(res => { })
    }
}
