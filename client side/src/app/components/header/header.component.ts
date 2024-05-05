import { User } from '../../models/user.model';
import { JobField } from '../../models/jobField.models';
import { JobFieldService } from '../../services/jobField.service';
import { Router } from '@angular/router';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent implements OnInit {
  user!: User;
  CVsNumber: number | undefined;
  jobFieldName: string | undefined;
  jobField?: JobField;
  @Output() jobFieldLinkClicked: EventEmitter<number|undefined > = new EventEmitter<number|undefined>();

  constructor(private jobFieldService: JobFieldService, private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user") || '{}');
    this.CVsNumber = this.user.cVsSentCount;
    this.getJobFieldDetails();
  }

  getJobFieldDetails() {
    this.jobFieldService.getJobFieldById(this.user.jobFieldId).subscribe((jobField: JobField | undefined) => {
      this.jobFieldName = jobField?.jobFieldName;
      this.jobField = jobField
    });
  }

  onJobFieldLinkClick(): void {
    console.log(this.jobField?.jobFieldId);
    this.jobFieldLinkClicked.emit(this.jobField?.jobFieldId);
  }
}
