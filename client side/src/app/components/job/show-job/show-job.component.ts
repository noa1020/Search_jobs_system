import { Component, Input, OnInit } from '@angular/core';
import { Job } from '../../../models/job.model';
import { JobFieldService } from '../../../services/jobField.service';
import { JobField } from '../../../models/jobField.models';

@Component({
  selector: 'app-show-job',
  templateUrl: './show-job.component.html',
  styleUrl: './show-job.component.scss'
})
export class ShowJobComponent implements OnInit {
  @Input() job: Job | undefined;
  jobFieldName?:string;

  constructor(private jobFieldService: JobFieldService) { }

  ngOnInit() {
    if (this.job?.jobFieldId) {
      this.jobFieldService.getJobFieldById(this.job.jobFieldId).subscribe((jobField: JobField | undefined) => {
        this.jobFieldName = jobField?.jobFieldName;
      });
    }
  }
}
