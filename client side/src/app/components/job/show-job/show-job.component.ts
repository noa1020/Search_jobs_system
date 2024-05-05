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
  SentCV(jobId:number  ) {
    this.userService.addJob(jobId);
    alert("CV sent successfuly");
  }
}
