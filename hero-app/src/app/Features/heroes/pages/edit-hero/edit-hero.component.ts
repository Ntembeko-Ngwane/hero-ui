import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HeroService } from '../../../../Core/services/hero.service';
import { Hero } from '../../../../Models/hero';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';


@Component({
  selector: 'app-edit-hero',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, MatSnackBarModule],
  templateUrl: './edit-hero.component.html',
  styleUrls: ['./edit-hero.component.css']
})
export class EditHeroComponent implements OnInit {

  hero!: Hero;

  id!: number;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private router: Router,
    private snackBar: MatSnackBar,
    /*private changeDetection: ChangeDetectorRef,*/
    private cdr: ChangeDetectorRef
  ) { }
 

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadHero(this.id);
  }

  loadHero(id: number) {

    this.heroService.getHero(id).subscribe({
      next: (data) => {
        this.hero = data;
        //this.changeDetection.detectChanges();
        this.cdr.markForCheck();

      },

      error: () => {
        console.error();
        this.snackBar.open('Failed to load hero', 'Close', { duration: 3000 }); 
       }
    });
  }

  updateHero() {
    this.heroService.updateHero(this.id, this.hero).subscribe({
      next: () => {
        this.snackBar.open('Hero updated', 'Close', { duration: 3000 });
        this.router.navigate(['/heroes']);

      },
      
      error: () => {
        console.error();
        this.snackBar.open('Update failed', 'Close', { duration: 3000 });
      }
    });
  }


}
