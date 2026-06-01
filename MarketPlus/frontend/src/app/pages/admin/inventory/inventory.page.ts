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
    saving = false;

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
        const stockNum = Math.max(0, Number(stock));
        const minNum = Math.max(0, Number(min));
        this.adminService.updateInventory(id, { stock: stockNum, stock_minimo: minNum }).subscribe({
            next: () => {
                const item = this.inventory.find(i => i.producto_id === id);
                if (item) {
                    item.stock = stockNum;
                    item.stock_minimo = minNum;
                }
                this.updateCounts();
                this.applyFilters();
            },
            error: (err) => this.toast.error(err.error?.message || 'Error al actualizar fila')
        });
    }

    saveAllInventory(): void {
        if (!this.filteredInventory.length) {
            this.toast.warning('No hay productos para guardar');
            return;
        }
        this.saving = true;
        let completed = 0;
        let errors = 0;
        const total = this.filteredInventory.length;

        this.filteredInventory.forEach((item) => {
            const stockNum = Math.max(0, Number(item.stock));
            const minNum = Math.max(0, Number(item.stock_minimo));
            this.adminService.updateInventory(item.producto_id, { stock: stockNum, stock_minimo: minNum }).subscribe({
                next: () => {
                    item.stock = stockNum;
                    item.stock_minimo = minNum;
                    completed++;
                    if (completed + errors === total) this.finishSave(errors);
                },
                error: () => {
                    errors++;
                    if (completed + errors === total) this.finishSave(errors);
                }
            });
        });
    }

    private finishSave(errors: number): void {
        this.saving = false;
        this.updateCounts();
        if (errors > 0) {
            this.toast.warning(`Guardado con ${errors} error(es)`);
        } else {
            this.toast.success('Inventario guardado correctamente');
        }
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
