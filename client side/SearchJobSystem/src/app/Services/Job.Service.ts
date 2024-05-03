import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Job } from '../Models/Job';


@Injectable({
    providedIn: 'root'
})

export class JobService {
    constructor(private http: HttpClient) {
        this.GetJobs();
    }

    JobList: Job[] = []

    public GetJobList() {
        return this.JobList
    }

    GetJobs() {
        this.http.get('https://localhost:7231/Job').subscribe((res: any) => this.JobList = res)
    }

    addJob(job: Job) {
        this.JobList.push(job)
        this.http.post('https://localhost:7231/Job', { body: job }).subscribe(res => { })
    }


}
