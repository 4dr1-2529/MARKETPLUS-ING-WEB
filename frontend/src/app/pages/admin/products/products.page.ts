import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { AdminService } from '../../../services/admin.service';
import { ToastService } from '../../../services/toast.service';
import { getApiErrorMessage } from '../../../utils/api-error.util';

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
    showModal = false;
    saving = false;
    editForm: any = {};

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
        this.productService.getAllAdmin(500).subscribe({
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

    openEdit(product: any): void {
        this.editForm = {
            id: product.id,
            nombre: product.nombre,
            precio: product.precio,
            precio_oferta: product.precio_oferta || null,
            estado: product.estado,
            descripcion: product.descripcion || '',
            categoria_id: product.categoria_id,
            marca_id: product.marca_id,
            sku: product.sku,
            garantia_meses: product.garantia_meses || 12,
            destacado: product.destacado || false,
            imagen_principal: product.imagen_principal
        };
        this.showModal = true;
    }

    closeModal(): void {
        this.showModal = false;
        this.editForm = {};
    }

    saveProduct(): void {
        if (!this.editForm.nombre?.trim()) {
            this.toast.warning('El nombre es obligatorio');
            return;
        }
        const payload = {
            nombre: this.editForm.nombre.trim(),
            precio: Number(this.editForm.precio),
            precio_oferta: this.editForm.precio_oferta ? Number(this.editForm.precio_oferta) : undefined,
            estado: this.editForm.estado,
            descripcion: this.editForm.descripcion,
            categoria_id: this.editForm.categoria_id,
            marca_id: this.editForm.marca_id,
            sku: this.editForm.sku,
            garantia_meses: Number(this.editForm.garantia_meses) || 12,
            destacado: !!this.editForm.destacado,
            imagen_principal: this.editForm.imagen_principal
        };
        this.saving = true;
        this.productService.update(this.editForm.id, payload).subscribe({
            next: () => {
                this.saving = false;
                this.toast.success('Producto actualizado');
                this.closeModal();
                this.loadData();
            },
            error: (err) => {
                this.saving = false;
                this.toast.error(getApiErrorMessage(err, 'Error al actualizar producto'));
            }
        });
    }

    toggleStatus(product: any): void {
        const newStatus = product.estado === 'activo' ? 'inactivo' : 'activo';
        this.productService.update(product.id, { estado: newStatus }).subscribe({
            next: () => {
                product.estado = newStatus;
                this.toast.success(`Producto ${newStatus === 'activo' ? 'activado' : 'desactivado'}`);
            },
            error: (err) => this.toast.error(getApiErrorMessage(err, 'Error al actualizar estado'))
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
