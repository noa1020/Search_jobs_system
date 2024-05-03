import { User } from '../../Models/User';
import { FieldJob } from '../../Models/FieldJob';
import { FieldJobService } from '../../Services/FieldJob.service';
import { Router } from '@angular/router';
//
//@Component({
//  selector: 'app-header',
//  templateUrl: './header.component.html',
//  styleUrl: './header.component.scss'
//})
//export class HeaderComponent {
//  constructor(private fieldJobService: FieldJobService, private router: Router) { }
//  user: User = JSON.parse(localStorage.getItem("user") || '{}');
//  CVsNumber: number = this.user.cVsSentCount;
//  fieldJobName: string
//  this.fieldJobService.GetFieldJobById(this.user.fieldJobId).subscribe((fieldJob: FieldJob | null) => {
//    if (fieldJob !== null) {
//      this.fieldJobName = fieldJob.jobFieldName;
//    });
//
//}
//
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: User = JSON.parse(localStorage.getItem("user") || '{}');
  CVsNumber: number | undefined = this.user.cVsSentCount;
  fieldJobName: string | undefined;
  constructor(private fieldJobService: FieldJobService, private router: Router) { }
  ngOnInit(): void {
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
