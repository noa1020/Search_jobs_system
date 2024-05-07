import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/user/login/login.component';
import { SignupComponent } from './components/user/signup/signup.component';
import { UpdateUserComponent } from './components/user/update-user/update-user.component';
import { JobListComponent } from './components/job/job-list/job-list.component';
import { AddJobComponent } from './components/job/add-job/add-job.component';
import { ShowJobComponent } from './components/job/show-job/show-job.component';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { JobService } from './services/job.service';
import { JobFieldService } from './services/jobField.service';
import { AppliedJobsListComponent } from './components/job/applied-jobs-list/applied-jobs-list.component';
import { JobCardDirective } from './directivs/job-card.directive';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    UpdateUserComponent,
    JobListComponent,
    AddJobComponent,
    ShowJobComponent,
    AppliedJobsListComponent,
    JobCardDirective,
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
