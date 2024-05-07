import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Job } from '../models/job.model';
import { Observable, map, of, tap } from 'rxjs';


@Injectable({
    providedIn: 'root'
})

export class JobService {
    private jobsUrl = 'https://localhost:7231/Job';
    jobList: Job[] = []

    constructor(private http: HttpClient) { }

    public getJobList(): Observable<Job[]> {
        if (this.jobList.length === 0) {
            return this.getJobsFromServer().pipe(
                tap(jobs => this.jobList = jobs)
            );
        } else {
            return of(this.jobList);
        }
    }
    
    getJobsFromServer(): Observable<Job[]> {
        return this.http.get<Job[]>(this.jobsUrl).pipe(
            tap(jobs => this.jobList = jobs)
        );
    }

    addJob(job: Job): Observable<any> {
        this.jobList.push(job);
        return this.http.post(this.jobsUrl, job);
    }

    public getJobById(idJob: number): Observable<Job | undefined> {
        const jobFromLocal = this.jobList.find(job => job.jobId === idJob);
        if (jobFromLocal) {
            return of(jobFromLocal);
        } else {
            return this.getJobList().pipe(
                map(jobs => jobs.find(job => job.jobId === idJob))
            );
        }
    }
}
