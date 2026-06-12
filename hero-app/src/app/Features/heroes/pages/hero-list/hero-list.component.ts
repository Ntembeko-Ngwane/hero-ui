import { Component, OnInit, computed, signal } from '@angular/core';
import { HeroService } from '../../../../Core/services/hero.service';
import { Hero } from '../../../../Models/hero';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { map, filter } from 'rxjs/operators';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { AuthService } from '../../../../Core/services/auth.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-hero-list',
  standalone: true,
  imports: [CommonModule, MatSnackBarModule],
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css']
})
export class HeroListComponent implements OnInit {

  heroes$!: Observable<Hero[]>;
  //heroes: Observable<Hero[]> = of([]);
  
  private searchTerm$ = new BehaviorSubject<string>('')

  filteredHeroes$!: Observable<Hero[]>;

  paginatedHeroes$!: Observable<Hero[]>;
  totalPages$!: Observable<number>;

  currentPage$ = new BehaviorSubject<number>(1);
  private pageSize$ = new BehaviorSubject<number>(7);
  private resizeTimeout: any;

  isLoading = false;
  isAdmin = false;
  
  constructor(
    private heroService: HeroService,
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
   
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.auth.isAdmin();
    this.calculatePageSize();
    this.loadHeroes();

    window.addEventListener('resize', () => {
      clearTimeout(this.resizeTimeout);

      this.resizeTimeout = setTimeout(() => {
        this.calculatePageSize();
        this.loadHeroes(); //reload pagination
      }, 200);
    });
  }

  calculatePageSize() {
    const headerHeight = 200;
    const footerHeight = 100;
    const rowHeight = 50;

    const availableHeight = window.innerHeight - headerHeight - footerHeight;

    const calculatedSize = Math.floor(availableHeight / rowHeight);

    const newSize = calculatedSize > 0 ? calculatedSize : 5;

    this.pageSize$.next(newSize);
    this.currentPage$.next(1);
  }


  loadHeroes() {
    this.isLoading = true;
    this.heroes$ = this.heroService.getHeroes();

    this.filteredHeroes$ = combineLatest([
      this.heroes$,
      this.searchTerm$
    ]).pipe(
      map(([heroes, searchTerm]) => {

        if (!searchTerm.trim()) return heroes;

        const term = searchTerm.toLowerCase();

        return heroes.filter(hero =>
          hero.firstName.toLowerCase().includes(term) ||
          hero.lastName.toLowerCase().includes(term)
        );
      })
    );

    this.paginatedHeroes$ = combineLatest([
      this.filteredHeroes$,
      this.currentPage$,
      this.pageSize$
    ]).pipe(
      map(([heroes, currentPage, pageSize]) => {
        const start = (currentPage - 1) * pageSize;
        return heroes.slice(start, start + pageSize);
      })
    );

    this.totalPages$ = combineLatest([
      this.filteredHeroes$,
      this.pageSize$
    ]).pipe(
      map(([heroes, pageSize]) => Math.ceil(heroes.length / pageSize))
    );

    this.isLoading = false;
  }
  nextPage() {
    this.currentPage$.next(this.currentPage$.value + 1);
  }

  prevPage() {
    if (this.currentPage$.value > 1) {
      this.currentPage$.next(this.currentPage$.value - 1);
    }
  }

  searchHeroes(term: string) {
    this.searchTerm$.next(term);
  }



  deleteHero(id: number) {
    if (confirm('Are you sure you want to delete this hero?')) {
      this.heroService.deleteHero(id).subscribe ({
        next: () => {
          this.snackBar.open('Hero deleted', 'Close', { duration: 3000 });
          this.loadHeroes();
        },
        error: () => {
          this.snackBar.open('Delete failed', 'Close', { duration: 3000 });
        }
      });
    }
  }

  editHero(id: number) {
    this.router.navigate(['/heroes/edit', id]);
  }

  goToAdd() {
    this.router.navigate(['/heroes/add']);
  }

  logout() {
    this.auth.logout(); // remove token
    this.router.navigate(['/login']); // redirect
  }
}
