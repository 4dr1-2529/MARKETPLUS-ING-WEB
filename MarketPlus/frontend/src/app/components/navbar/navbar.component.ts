import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    isLoggedIn = false;
    isAdmin = false;
    userName = '';
    cartCount = 0;
    mobileMenuOpen = false;
    searchQuery = '';

    constructor(
        public auth: AuthService,
        private cartService: CartService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.auth.currentUser$.subscribe(user => {
            this.isLoggedIn = !!user;
            this.isAdmin = user?.role === 'admin';
            this.userName = user ? `${user.nombres} ${user.apellidos}` : '';
        });
    }

    onSearch(): void {
        if (this.searchQuery.trim()) {
            this.router.navigate(['/catalogo'], { queryParams: { search: this.searchQuery } });
        }
    }

    logout(): void {
        this.auth.logout();
        this.router.navigate(['/']);
    }

    toggleMobileMenu(): void {
        this.mobileMenuOpen = !this.mobileMenuOpen;
    }
}
