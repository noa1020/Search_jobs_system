import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobField } from '../../../models/jobField.models';
import { JobFieldService } from '../../../services/jobField.service';
import { User } from '../../../models/user.model';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  jobFields: JobField[] = [];
  constructor(private formBuilder: FormBuilder, private jobFieldService: JobFieldService,
    private authService: AuthService, private router: Router) {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      jobField: ['', Validators.required]
    }, { validator: this.checkPasswords });
  }
  ngOnInit() {
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

  async signUp() {
    if (this.signupForm.valid) {
      try {
        const isSignedUp = await this.authService.signUp(this.signupForm.value.username, this.signupForm.value.password, this.signupForm.value.jobField);
        if (isSignedUp) {
          this.router.navigate(['/home']);
        } else {
          alert("Error adding user");
        }
      } catch (error: any) {
        alert(error['errorMessage']);
      }
    }
  }
  goBack() {
    this.router.navigate(['/login']);
  }

}