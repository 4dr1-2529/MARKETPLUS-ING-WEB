import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { ToastService } from '../../../services/toast.service';
import { getApiErrorMessage } from '../../../utils/api-error.util';

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
                this.inventory = (res.data || []).map((item: any) => {
                    const row = { ...item };
                    const stock = Number(row.stock) || 0;
                    const max = Number(row.stock_maximo) || 0;
                    if (max < stock) {
                        row.stock_maximo = stock;
                    }
                    return row;
                });
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

    private normalizeItemStock(item: any): void {
        item.stock = Math.max(0, Number(item.stock) || 0);
        item.stock_minimo = Math.max(0, Number(item.stock_minimo) || 0);
        item.stock_maximo = Math.max(0, Number(item.stock_maximo) || 0);
        if (item.stock_maximo > 0 && item.stock > item.stock_maximo) {
            item.stock_maximo = item.stock;
        }
    }

    private toPayload(item: any): { producto_id: number; stock: number; stock_minimo: number; stock_maximo: number } {
        this.normalizeItemStock(item);
        return {
            producto_id: item.producto_id,
            stock: item.stock,
            stock_minimo: item.stock_minimo,
            stock_maximo: item.stock_maximo
        };
    }

    updateStock(id: number, stock: number, min: number): void {
        const item = this.inventory.find(i => i.producto_id === id);
        if (!item) return;
        item.stock = stock;
        item.stock_minimo = min;
        const payload = this.toPayload(item);
        this.adminService.updateInventory(id, payload).subscribe({
            next: () => {
                if (item) {
                    item.stock = payload.stock;
                    item.stock_minimo = payload.stock_minimo;
                    item.stock_maximo = payload.stock_maximo;
                }
                this.updateCounts();
                this.applyFilters();
            },
            error: (err) => this.toast.error(err.error?.message || 'Error al actualizar fila')
        });
    }

    saveAllInventory(): void {
        if (!this.inventory.length) {
            this.toast.warning('No hay productos para guardar');
            return;
        }
        const items = this.inventory.map((item) => this.toPayload(item));

        this.saving = true;
        this.adminService.updateInventoryBatch(items).subscribe({
            next: () => {
                this.saving = false;
                this.toast.success('Inventario guardado correctamente');
                this.loadData();
            },
            error: (err) => {
                this.saving = false;
                this.toast.error(getApiErrorMessage(err, 'Error al guardar inventario'));
            }
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
