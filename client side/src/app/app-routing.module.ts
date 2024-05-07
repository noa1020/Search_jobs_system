import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth.guard';
import { SignupComponent } from './components/signup/signup.component';
import { AppliedJobsListComponent } from './components/applied-jobs-list/applied-jobs-list.component';
import { JobListComponent } from './components/job/job-list/job-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'jobs_list', pathMatch: 'full' },
      { path: 'jobs_list', component: JobListComponent },
      { path: 'jobs_list/:fieldName', component: AppliedJobsListComponent },
      { path: 'applied_jobs_list', component: AppliedJobsListComponent },
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
