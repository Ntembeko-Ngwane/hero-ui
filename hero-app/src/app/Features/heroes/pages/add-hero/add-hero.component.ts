import { Component } from '@angular/core';
import { HeroService } from '../../../../Core/services/hero.service';
import { Router, RouterLink } from '@angular/router';
import { Hero } from '../../../../Models/hero';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-hero',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, MatSnackBarModule],
  templateUrl: './add-hero.component.html',
  styleUrls: ['./add-hero.component.css']
})
export class AddHeroComponent {

  hero: Hero = {
    id: 0,
    firstName: '',
    lastName: '',
    isActive: true
  };

  constructor(
    private heroService: HeroService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

    addHero() {
      this.heroService.addHero(this.hero).subscribe({
        next: () => {
          this.snackBar.open('Hero added successfully', 'Close', { duration: 3000 });
          this.router.navigate(['/heroes']).then(() => {
         /*   window.location.reload();*/
          });
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Failed to add hero', 'Close', { duration: 3000 });
      }
      });

  }


  //onSubmit() {
  //  console.log("SUBMIT CLICKED");

  //  if (this.form.invalid) {
  //    console.log("INVALID FORM");
  //    return;
  //  }

  //  console.log("SENDING TO BACKEND", this.form.value);

  //  this.heroService.addHero(this.form.value as any)
  //    .subscribe({
  //      next: () => alert("Hero Added!"),
  //      error: (err) => console.error("API ERROR", err)
  //    });
  //}
}
