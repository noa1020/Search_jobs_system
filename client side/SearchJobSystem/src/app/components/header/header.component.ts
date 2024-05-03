import { User } from '../../Models/User';
import { FieldJob } from '../../Models/FieldJob';
import { FieldJobService } from '../../Services/FieldJob.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent implements OnInit {
  user!: User;
  CVsNumber: number | undefined ;
  fieldJobName: string | undefined;
  constructor(private fieldJobService: FieldJobService, private router: Router) { }
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user") || '{}');
    this.CVsNumber = this.user.cVsSentCount;

    this.getFieldJobDetails();
  }
  getFieldJobDetails() {
    this.fieldJobService.GetFieldJobById(this.user.jobFieldId).subscribe((fieldJob: FieldJob | null) => {
      if (fieldJob !== null) {
        this.fieldJobName = fieldJob.jobFieldName;
      }
    });
  }
}
