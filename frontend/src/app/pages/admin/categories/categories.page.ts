import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { ToastService } from '../../../services/toast.service';
import { getApiErrorMessage } from '../../../utils/api-error.util';

@Component({
    selector: 'app-admin-categories',
    templateUrl: './categories.page.html',
    styleUrls: ['./categories.page.css']
})
export class AdminCategoriesPage implements OnInit {
    categories: any[] = [];
    showModal = false;
    isNew = false;
    saving = false;
    form: any = {};

    constructor(
        private categoryService: CategoryService,
        private toast: ToastService
    ) {}

    ngOnInit(): void {
        this.loadCategories();
    }

    loadCategories(): void {
        this.categoryService.getAllAdmin().subscribe({
            next: (res) => { this.categories = res.data || []; },
            error: () => this.toast.error('Error al cargar categorias')
        });
    }

    openNew(): void {
        this.isNew = true;
        this.form = { nombre: '', descripcion: '', estado: 'activo', padre_id: null };
        this.showModal = true;
    }

    openEdit(category: any): void {
        this.isNew = false;
        this.form = {
            id: category.id,
            nombre: category.nombre,
            descripcion: category.descripcion || '',
            estado: category.estado || 'activo',
            padre_id: category.padre_id || null
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
            descripcion: this.form.descripcion?.trim() || null,
            estado: this.form.estado,
            padre_id: this.form.padre_id || null
        };
        const req = this.isNew
            ? this.categoryService.create(payload)
            : this.categoryService.update(this.form.id, payload);
        this.saving = true;
        req.subscribe({
            next: () => {
                this.saving = false;
                this.toast.success(this.isNew ? 'Categoria creada' : 'Categoria actualizada');
                this.closeModal();
                this.loadCategories();
            },
            error: (err) => {
                this.saving = false;
                this.toast.error(getApiErrorMessage(err, 'Error al guardar categoria'));
            }
        });
    }

    deleteCategory(category: any): void {
        if (!confirm(`¿Eliminar la categoria "${category.nombre}"?`)) return;
        this.categoryService.delete(category.id).subscribe({
            next: () => {
                this.toast.success('Categoria eliminada');
                this.loadCategories();
            },
            error: () => this.toast.error('Error al eliminar categoria')
        });
    }
}
