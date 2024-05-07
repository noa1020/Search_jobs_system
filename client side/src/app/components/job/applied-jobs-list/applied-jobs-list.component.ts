import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';
import { Job } from '../../../models/job.model';
import { JobService } from '../../../services/job.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-applied-jobs-list',
  templateUrl: './applied-jobs-list.component.html',
  styleUrl: './applied-jobs-list.component.scss'
})
export class AppliedJobsListComponent implements OnInit {
  user!: User;
  idJobsCvsSent: number[] = [];
  jobs: Job[] = [];

  constructor(
    private jobService: JobService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user") || '{}');
    this.updateUser(this.user);
    this.userService.userUpdated.subscribe((updatedUser: User) => {
      this.updateUser(updatedUser);
    });    

  }

  updateUser(updatedUser: User): void {
    this.user = updatedUser;
    this.idJobsCvsSent = updatedUser.cVsSentIdsJobs || [];
    this.loadJobs();
  }

  loadJobs() {
    if (this.idJobsCvsSent.length === 0) {
      this.jobs = [];
      return;
    }
    this.idJobsCvsSent.forEach(idJob => {
      this.jobService.getJobById(idJob)
        .subscribe(job => {
          if (job !== undefined) {
            this.jobs.push(job);
          }
        });
    });
  }
}