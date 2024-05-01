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
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from './Services/Auth.service';
import { UserService } from './Services/User.Service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

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
    ShowJobComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    AuthService,
    Router,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
