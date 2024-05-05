import { User } from '../../models/user.model';
import { JobField } from '../../models/jobField.models';
import { JobFieldService } from '../../services/jobField.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

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
  constructor(private jobFieldService: JobFieldService, private router: Router) { }
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user") || '{}');
    this.CVsNumber = this.user.cVsSentCount;

    this.getJobFieldDetails();
  }
  getJobFieldDetails() {
    this.jobFieldService.getJobFieldById(this.user.jobFieldId).subscribe((jobField: JobField | undefined) => {
        this.jobFieldName = jobField?.jobFieldName;
    });
}
}
