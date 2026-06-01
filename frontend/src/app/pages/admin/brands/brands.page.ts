import { Component, OnInit } from '@angular/core';
import { BrandService } from '../../../services/brand.service';
import { ToastService } from '../../../services/toast.service';
import { getApiErrorMessage } from '../../../utils/api-error.util';

@Component({
    selector: 'app-admin-brands',
    templateUrl: './brands.page.html',
    styleUrls: ['./brands.page.css']
})
export class AdminBrandsPage implements OnInit {
    brands: any[] = [];
    showModal = false;
    isNew = false;
    saving = false;
    form: any = {};

    constructor(
        private brandService: BrandService,
        private toast: ToastService
    ) {}

    ngOnInit(): void {
        this.loadBrands();
    }

    loadBrands(): void {
        this.brandService.getAllAdmin().subscribe({
            next: (res) => { this.brands = res.data || []; },
            error: () => this.toast.error('Error al cargar marcas')
        });
    }

    openNew(): void {
        this.isNew = true;
        this.form = { nombre: '', pais_origen: '', sitio_web: '', estado: 'activo' };
        this.showModal = true;
    }

    openEdit(brand: any): void {
        this.isNew = false;
        this.form = {
            id: brand.id,
            nombre: brand.nombre,
            pais_origen: brand.pais_origen || '',
            sitio_web: brand.sitio_web || '',
            estado: brand.estado || 'activo',
            logo: brand.logo || null
        };
        this.showModal = true;
    }

    closeModal(): void {
        this.showModal = false;
        this.form = {};
    }

    save(): void {
        if (!this.form.nombre?.trim()) {
            this.toast.warning('El nombre es obligatorio');
            return;
        }
        const payload = {
            nombre: this.form.nombre.trim(),
            pais_origen: this.form.pais_origen?.trim() || null,
            sitio_web: this.form.sitio_web?.trim() || null,
            estado: this.form.estado,
            logo: this.form.logo
        };
        const req = this.isNew
            ? this.brandService.create(payload)
            : this.brandService.update(this.form.id, payload);
        this.saving = true;
        req.subscribe({
            next: () => {
                this.saving = false;
                this.toast.success(this.isNew ? 'Marca creada' : 'Marca actualizada');
                this.closeModal();
                this.loadBrands();
            },
            error: (err) => {
                this.saving = false;
                this.toast.error(getApiErrorMessage(err, 'Error al guardar marca'));
            }
        });
    }

    deleteBrand(brand: any): void {
        if (!confirm(`¿Eliminar la marca "${brand.nombre}"?`)) return;
        this.brandService.delete(brand.id).subscribe({
            next: () => {
                this.toast.success('Marca eliminada');
                this.loadBrands();
            },
            error: () => this.toast.error('Error al eliminar marca')
        });
    }
}
