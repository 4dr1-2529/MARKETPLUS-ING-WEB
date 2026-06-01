import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FavoriteService } from '../../services/favorite.service';
import { ToastService } from '../../services/toast.service';
import { listAnimation } from '../../shared/animations';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-favorites',
    templateUrl: './favorites.page.html',
    styleUrls: ['./favorites.page.css'],
    animations: [listAnimation]
})
export class FavoritesPage implements OnInit {
    favorites: any[] = [];
    loading = true;

    constructor(
        private favoriteService: FavoriteService,
        private toast: ToastService,
        private auth: AuthService,
        private router: Router
    ) {}

    ngOnInit(): void {
        if (!this.auth.isAuthenticated) {
            this.toast.warning('Inicia sesion para ver tus favoritos');
            this.router.navigate(['/login'], { queryParams: { return: '/favoritos' } });
            return;
        }
        this.loadFavorites();
    }

    loadFavorites(): void {
        this.favoriteService.getFavorites().subscribe({
            next: (res) => {
                this.favorites = res.data;
                this.loading = false;
                this.favoriteService.updateCount(res.data.length);
            },
            error: () => {
                this.loading = false;
                this.toast.error('Error al cargar favoritos');
            }
        });
    }

    removeFavorite(productoId: number): void {
        this.favoriteService.removeFavorite(productoId).subscribe({
            next: () => {
                this.favorites = this.favorites.filter(f => f.producto_id !== productoId);
                this.favoriteService.updateCount(this.favoriteService.getCount() - 1);
                this.toast.success('Eliminado de favoritos');
            },
            error: () => this.toast.error('No se pudo eliminar')
        });
    }

    getPrice(item: any): number {
        return item.precio_oferta || item.precio;
    }

    goToProduct(slug: string): void {
        this.router.navigate(['/producto', slug]);
    }
}
