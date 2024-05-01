import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/Auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private authService: AuthService,private router: Router) { }

  login(username: string, password: string): void {
    if (this.authService.login(username, password)) {
      this.router.navigate(['/home']);
    }
    else {
      alert("User not found");
    }
  }
}
