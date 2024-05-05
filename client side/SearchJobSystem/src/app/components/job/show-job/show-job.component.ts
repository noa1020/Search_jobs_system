import { Component, Input } from '@angular/core';
import { Job } from '../../../models/job.model';

@Component({
  selector: 'app-show-job',
  templateUrl: './show-job.component.html',
  styleUrl: './show-job.component.scss'
})
export class ShowJobComponent {
  @Input() job: Job | undefined;

  constructor() { }

}
