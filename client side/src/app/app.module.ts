import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ShowUserComponent } from './components/user/show-user/show-user.component';
import { AddUserComponent } from './components/user/add-user/add-user.component';
import { DeleteUserComponent } from './components/user/delete-user/delete-user.component';
import { UpdateUserComponent } from './components/user/update-user/update-user.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { JobListComponent } from './components/job/job-list/job-list.component';
import { AddJobComponent } from './components/job/add-job/add-job.component';
import { UpdateJobComponent } from './components/job/update-job/update-job.component';
import { DeleteJobComponent } from './components/job/delete-job/delete-job.component';
import { ShowJobComponent } from './components/job/show-job/show-job.component';
import { FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { JobService } from './services/job.service';
import { JobFieldService } from './services/jobField.service';
import { AppliedJobsListComponent } from './components/applied-jobs-list/applied-jobs-list.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    ShowUserComponent,
    AddUserComponent,
    DeleteUserComponent,
    UpdateUserComponent,
    UserListComponent,
    JobListComponent,
    AddJobComponent,
    UpdateJobComponent,
    DeleteJobComponent,
    ShowJobComponent,
    AppliedJobsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthService,
    Router,
    UserService,
    JobService,
    JobFieldService,
    ReactiveFormsModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
