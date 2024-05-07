import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) { }

  async login(username: string, password: string): Promise<void> {
    const isLoggedIn = await this.authService.login(username, password);
    if (isLoggedIn) {
      this.router.navigate(['/home']);
    }
    else {
      alert("User not found");
    }
  }

  signUp(){
    this.router.navigate(['/signup']);
  }
}
