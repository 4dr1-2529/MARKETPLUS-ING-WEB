import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { AdminService } from '../../../services/admin.service';
import { ToastService } from '../../../services/toast.service';
import { Producto } from '../../../models/producto.model';

@Component({
    selector: 'app-admin-products',
    templateUrl: './products.page.html',
    styleUrls: ['./products.page.css']
})
export class AdminProductsPage implements OnInit {
    products: any[] = [];
    inventory: any[] = [];
    loading = true;
    searchQuery = '';
    filteredProducts: any[] = [];

    constructor(
        private productService: ProductService,
        private adminService: AdminService,
        private toast: ToastService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.loadData();
    }

    loadData(): void {
        this.loading = true;
        this.productService.getAll({ limit: 200 }).subscribe({
            next: (res) => {
                this.products = res.data || [];
                this.adminService.getInventory().subscribe({
                    next: (invRes) => {
                        this.inventory = invRes.data || [];
                        this.mergeInventory();
                        this.applySearch();
                        this.loading = false;
                    },
                    error: () => { this.loading = false; }
                });
            },
            error: () => { this.loading = false; }
        });
    }

    mergeInventory(): void {
        const invMap = new Map();
        this.inventory.forEach(item => invMap.set(item.producto_id, item));
        this.products.forEach(p => {
            const inv = invMap.get(p.id);
            p.stock = inv ? inv.stock : 0;
            p.stock_minimo = inv ? inv.stock_minimo : 5;
        });
    }

    applySearch(): void {
        if (!this.searchQuery.trim()) {
            this.filteredProducts = [...this.products];
            return;
        }
        const q = this.searchQuery.toLowerCase();
        this.filteredProducts = this.products.filter(p =>
            p.nombre.toLowerCase().includes(q) ||
            p.categoria?.toLowerCase().includes(q) ||
            p.marca?.toLowerCase().includes(q) ||
            p.sku?.toLowerCase().includes(q)
        );
    }

    viewProduct(slug: string): void {
        window.open(`/producto/${slug}`, '_blank');
    }

    toggleStatus(product: any): void {
        const newStatus = product.estado === 'activo' ? 'inactivo' : 'activo';
        this.productService.update(product.id, { estado: newStatus }).subscribe({
            next: () => {
                product.estado = newStatus;
                this.toast.success(`Producto ${newStatus === 'activo' ? 'activado' : 'desactivado'}`);
            },
            error: () => this.toast.error('Error al actualizar estado')
        });
    }

    deleteProduct(product: any): void {
        if (!confirm(`¿Estas seguro de eliminar "${product.nombre}"?`)) return;
        this.productService.delete(product.id).subscribe({
            next: () => {
                this.products = this.products.filter(p => p.id !== product.id);
                this.applySearch();
                this.toast.success('Producto eliminado');
            },
            error: () => this.toast.error('Error al eliminar producto')
        });
    }

    getStockBadge(stock: number, min: number): string {
        if (stock <= 0) return 'badge-danger';
        if (stock <= min) return 'badge-warning';
        return 'badge-success';
    }

    getStockLabel(stock: number, min: number): string {
        if (stock <= 0) return 'Agotado';
        if (stock <= min) return 'Bajo';
        return 'OK';
    }
}
