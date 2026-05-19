import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { ToastService } from '../../../services/toast.service';

@Component({
    selector: 'app-admin-inventory',
    templateUrl: './inventory.page.html',
    styleUrls: ['./inventory.page.css']
})
export class AdminInventoryPage implements OnInit {
    inventory: any[] = [];
    loading = true;
    searchQuery = '';
    filteredInventory: any[] = [];
    lowStockOnly = false;
    stockOkCount = 0;
    stockLowCount = 0;
    stockOutCount = 0;

    constructor(private adminService: AdminService, private toast: ToastService) {}

    ngOnInit(): void {
        this.loadData();
    }

    loadData(): void {
        this.loading = true;
        this.adminService.getInventory().subscribe({
            next: (res) => {
                this.inventory = res.data || [];
                this.updateCounts();
                this.applyFilters();
                this.loading = false;
            },
            error: () => { this.loading = false; }
        });
    }

    updateCounts(): void {
        this.stockOkCount = this.inventory.filter(i => i.stock > i.stock_minimo).length;
        this.stockLowCount = this.inventory.filter(i => i.stock > 0 && i.stock <= i.stock_minimo).length;
        this.stockOutCount = this.inventory.filter(i => i.stock <= 0).length;
    }

    loadData(): void {
        this.loading = true;
        this.adminService.getInventory().subscribe({
            next: (res) => {
                this.inventory = res.data || [];
                this.applyFilters();
                this.loading = false;
            },
            error: () => { this.loading = false; }
        });
    }

    applyFilters(): void {
        let items = [...this.inventory];
        if (this.lowStockOnly) {
            items = items.filter(i => i.stock <= i.stock_minimo);
        }
        if (this.searchQuery.trim()) {
            const q = this.searchQuery.toLowerCase();
            items = items.filter(i =>
                i.nombre.toLowerCase().includes(q) ||
                i.sku?.toLowerCase().includes(q) ||
                i.categoria?.toLowerCase().includes(q) ||
                i.marca?.toLowerCase().includes(q)
            );
        }
        this.filteredInventory = items;
    }

    updateStock(id: number, stock: number, min: number): void {
        if (stock < 0) stock = 0;
        this.adminService.updateInventory(id, { stock, stock_minimo: min }).subscribe({
            next: () => this.toast.success('Inventario actualizado'),
            error: () => this.toast.error('Error al actualizar')
        });
    }

    getStockStatus(item: any): string {
        if (item.stock <= 0) return 'agotado';
        if (item.stock <= item.stock_minimo) return 'bajo';
        return 'ok';
    }

    getStockBadgeClass(status: string): string {
        if (status === 'agotado') return 'badge-danger';
        if (status === 'bajo') return 'badge-warning';
        return 'badge-success';
    }

    getStockLabel(status: string): string {
        if (status === 'agotado') return 'Agotado';
        if (status === 'bajo') return 'Stock Bajo';
        return 'Disponible';
    }
}
