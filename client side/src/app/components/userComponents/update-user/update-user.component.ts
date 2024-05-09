import { Component, OnInit } from '@angular/core';
import { JobField } from '../../../models/jobField.models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobFieldService } from '../../../services/jobField.service';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.scss'
})
export class UpdateUserComponent implements OnInit {
  editUserForm: FormGroup;
  jobFields: JobField[] = [];
  currentUser!: User;
  constructor(
    private formBuilder: FormBuilder,
    private jobFieldService: JobFieldService,
    private userService: UserService,
    private router: Router) {
    this.editUserForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      jobField: ['', Validators.required]
    }, { validator: this.checkPasswords });
  }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem("user") || '{}');
    this.getJobFields();
  }

  getJobFields(): void {
    this.jobFieldService.getJobFields()
      .subscribe((jobFields: JobField[]) => {
        this.jobFields = jobFields;
      });
  }

  checkPasswords(group: FormGroup) {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('confirmPassword')?.value;
    return (pass === confirmPass || !confirmPass) ? null : { notSame: true }
  }

  async update() {
    if (this.editUserForm.valid) {
      try {
        this.currentUser.password = this.editUserForm.value.password;
        this.currentUser.jobFieldId = parseInt(this.editUserForm.value.jobField);
        const isUserUpdated = await this.userService.updateUser(this.currentUser);
        if (isUserUpdated) {
          this.router.navigate(['/home']);
        } else {
          alert("Error update user");
        }
      } catch (error: any) {
        if (error['status'] == 400)
          this.router.navigate(['/login']);
        else
          alert(error);
      }
    }
  }
}