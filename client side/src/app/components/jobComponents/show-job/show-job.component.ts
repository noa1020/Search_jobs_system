import { Component, Input, OnInit } from '@angular/core';
import { Job } from '../../../models/job.model';
import { JobFieldService } from '../../../services/jobField.service';
import { JobField } from '../../../models/jobField.models';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-show-job',
  templateUrl: './show-job.component.html',
  styleUrl: './show-job.component.scss'
})
export class ShowJobComponent implements OnInit {
  @Input() job: Job | undefined;
  @Input() aploiedJob : boolean = false;
  jobFieldName?: string;
  showDetails: boolean = false;

  constructor(private jobFieldService: JobFieldService, private userService: UserService) { }

  ngOnInit() {
    if (this.job?.jobFieldId) {
      this.jobFieldService.getJobFieldById(this.job.jobFieldId).subscribe((jobField: JobField | undefined) => {
        this.jobFieldName = jobField?.jobFieldName;
      });
    }
  }
  toggleDetails() {
    this.showDetails = !this.showDetails;
  }
  SentCV(jobId: number) {
    if (this.userService.addJobToUser(jobId))
      alert("CV sent successfuly.");
    else
    alert("You have already sent us a CV, please wait for a reply.");
  }
}
