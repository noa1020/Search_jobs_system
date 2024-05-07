import { User } from '../../models/user.model';
import { JobField } from '../../models/jobField.models';
import { JobFieldService } from '../../services/jobField.service';
import { NavigationEnd, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

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
  showProfileOptions: boolean = false;

  constructor(private jobFieldService: JobFieldService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user") || '{}');
    this.CVsNumber = this.user.cVsSentCount;
    this.userService.userUpdated.subscribe((updatedUser: User) => {
      this.CVsNumber = updatedUser.cVsSentCount;
    });
    this.getJobFieldDetails();
  }

  getJobFieldDetails() {
    this.jobFieldService.getJobFieldById(this.user.jobFieldId).subscribe((jobField: JobField | undefined) => {
      this.jobFieldName = jobField?.jobFieldName;
      this.jobField = jobField
    });
  }

  onJobFieldLinkClick(): void {
    this.router.navigate(['/home'], { queryParams: { fieldName: this.jobFieldName } });
  }

  toggleProfileOptions() {
    this.showProfileOptions = !this.showProfileOptions;
  }
  onLogoutClick() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
  onEditProfileClick() {
    throw new Error('Method not implemented.');
  }


}
