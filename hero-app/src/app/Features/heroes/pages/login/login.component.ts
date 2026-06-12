import { Component } from '@angular/core';
import { AuthService } from '../../../../Core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf, NgClass } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, NgIf, NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  username = '';
  password = '';

  message = '';
  isError = false;

  constructor(private auth: AuthService, private router: Router) { }

  login() {
    this.auth.login({ username: this.username, password: this.password })
      .subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);

        this.router.navigate(['/heroes']);
      },
      error: (err) => {
        console.log(err.error.message);

      }
    });
  }
}
