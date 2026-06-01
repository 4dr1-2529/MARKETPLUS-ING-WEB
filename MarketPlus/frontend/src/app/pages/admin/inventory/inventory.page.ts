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
    outOfStockOnly = false;
    stockOkCount = 0;
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
                this.inventory = (res.data || []).map((item: any) => ({
                    ...item,
                    stock: Math.max(0, Number(item.stock) || 0)
                }));
                this.updateCounts();
                this.applyFilters();
                this.loading = false;
            },
            error: () => { this.loading = false; }
        });
    }

    updateCounts(): void {
        this.stockOkCount = this.inventory.filter(i => i.stock > 0).length;
        this.stockOutCount = this.inventory.filter(i => i.stock <= 0).length;
    }

    applyFilters(): void {
        let items = [...this.inventory];
        if (this.outOfStockOnly) {
            items = items.filter(i => i.stock <= 0);
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

    private toPayload(item: any): { producto_id: number; stock: number } {
        return {
            producto_id: item.producto_id,
            stock: Math.max(0, Number(item.stock) || 0)
        };
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
        return item.stock <= 0 ? 'agotado' : 'ok';
    }

    getStockBadgeClass(status: string): string {
        return status === 'agotado' ? 'badge-danger' : 'badge-success';
    }

    getStockLabel(status: string): string {
        return status === 'agotado' ? 'Agotado' : 'Disponible';
    }
}
