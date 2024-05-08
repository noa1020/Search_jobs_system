import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/user/login/login.component';
import { AuthGuard } from './auth.guard';
import { SignupComponent } from './components/user/signup/signup.component';
import { AppliedJobsListComponent } from './components/job/applied-jobs-list/applied-jobs-list.component';
import { JobListComponent } from './components/job/job-list/job-list.component';
import { UpdateUserComponent } from './components/user/update-user/update-user.component';
import { AddJobComponent } from './components/job/add-job/add-job.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'jobs_list', pathMatch: 'full' },
      { path: 'jobs_list', component: JobListComponent },
      { path: 'applied_jobs_list', component: AppliedJobsListComponent },
      { path: 'edit_user', component: UpdateUserComponent },
      { path: 'add_job', component: AddJobComponent },      
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
