import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../Core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { NgIf, NgClass } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink, NgIf, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  username = '';
  password = '';

  message = '';
  isError = false;
  isLoading = false;

  constructor(private auth: AuthService, private router: Router) { }


  register() {
    if (this.isLoading) return;

    this.isLoading = true;


    this.auth.register({ username: this.username, password: this.password })
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.message = res.meaasge || 'Registration successful! You can now login.';
          this.isError = false;
          this.isLoading = false;

          
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1000);
        
        },
        error: (err) => {
          console.error(err);
          this.message = err.error?.message || 'Registration failed';
          this.isError = true;
          this.isLoading = false;
        }
    });
  }
}
