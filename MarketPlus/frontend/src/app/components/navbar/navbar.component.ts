import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { FavoriteService } from '../../services/favorite.service';
import { ThemeService } from '../../services/theme.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
    isLoggedIn = false;
    isAdmin = false;
    userName = '';
    cartCount = 0;
    favCount = 0;
    mobileMenuOpen = false;
    searchQuery = '';
    isDark = false;
    private subs: Subscription[] = [];

    constructor(
        public auth: AuthService,
        private cartService: CartService,
        private favService: FavoriteService,
        private router: Router,
        public theme: ThemeService
    ) {}

    ngOnInit(): void {
        this.subs.push(
            this.auth.currentUser$.subscribe(user => {
                this.isLoggedIn = !!user;
                this.isAdmin = user?.role === 'admin';
                this.userName = user ? `${user.nombres} ${user.apellidos}` : '';
                if (user) {
                    this.loadCounts();
                } else {
                    this.cartCount = 0;
                    this.favCount = 0;
                }
            })
        );
        this.subs.push(
            this.cartService.count$.subscribe(count => { this.cartCount = count; })
        );
        this.subs.push(
            this.theme.isDark$.subscribe(d => this.isDark = d)
        );
    }

    ngOnDestroy(): void {
        this.subs.forEach(s => s.unsubscribe());
    }

    loadCounts(): void {
        this.cartService.getCart().subscribe({
            next: (res) => { this.cartCount = res.data?.total_items || 0; },
            error: () => { this.cartCount = 0; }
        });
        this.favService.getFavorites().subscribe({
            next: (res) => { this.favCount = res.data?.length || 0; },
            error: () => { this.favCount = 0; }
        });
    }

    toggleTheme(): void {
        this.theme.toggle();
    }

    onSearch(): void {
        if (this.searchQuery.trim()) {
            this.router.navigate(['/catalogo'], { queryParams: { search: this.searchQuery } });
        }
    }

    logout(): void {
        this.auth.logout();
        this.cartCount = 0;
        this.favCount = 0;
        this.router.navigate(['/']);
    }

    toggleMobileMenu(): void {
        this.mobileMenuOpen = !this.mobileMenuOpen;
    }

    updateCartCount(count: number): void {
        this.cartCount = count;
    }
}
