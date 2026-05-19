import { Component, OnInit } from '@angular/core';
import { AddressService } from '../../services/address.service';
import { ToastService } from '../../services/toast.service';
import { Direccion } from '../../models/address.model';
import { fadeInAnimation, scaleAnimation } from '../../shared/animations';

@Component({
    selector: 'app-addresses',
    templateUrl: './addresses.page.html',
    styleUrls: ['./addresses.page.css'],
    animations: [fadeInAnimation, scaleAnimation]
})
export class AddressesPage implements OnInit {
    addresses: Direccion[] = [];
    loading = true;
    showModal = false;
    editingId: number | null = null;

    formData: Partial<Direccion> = {
        tipo: 'casa',
        destinatario: '',
        direccion_linea1: '',
        direccion_linea2: '',
        departamento: '',
        provincia: '',
        distrito: '',
        codigo_postal: '',
        referencia: '',
        telefono: '',
        es_principal: false
    };

    departamentos = [
        'Lima', 'Arequipa', 'Cusco', 'Trujillo', 'Piura',
        'Chiclayo', 'Iquitos', 'Huancayo', 'Tacna', 'Pucallpa'
    ];

    constructor(
        private addressService: AddressService,
        private toast: ToastService
    ) {}

    ngOnInit(): void {
        this.loadAddresses();
    }

    loadAddresses(): void {
        this.loading = true;
        this.addressService.getAll().subscribe({
            next: (res) => {
                this.addresses = res.data;
                this.loading = false;
            },
            error: () => {
                this.loading = false;
                this.toast.error('Error al cargar direcciones');
            }
        });
    }

    openModal(address?: Direccion): void {
        if (address) {
            this.editingId = address.id || null;
            this.formData = { ...address };
        } else {
            this.editingId = null;
            this.formData = {
                tipo: 'casa',
                destinatario: '',
                direccion_linea1: '',
                direccion_linea2: '',
                departamento: '',
                provincia: '',
                distrito: '',
                codigo_postal: '',
                referencia: '',
                telefono: '',
                es_principal: false
            };
        }
        this.showModal = true;
    }

    closeModal(): void {
        this.showModal = false;
        this.editingId = null;
    }

    saveAddress(): void {
        if (!this.formData.destinatario || !this.formData.direccion_linea1 || !this.formData.departamento || !this.formData.provincia || !this.formData.distrito) {
            this.toast.warning('Completa todos los campos obligatorios');
            return;
        }

        if (this.editingId) {
            this.addressService.update(this.editingId, this.formData).subscribe({
                next: () => {
                    this.toast.success('Direccion actualizada');
                    this.closeModal();
                    this.loadAddresses();
                },
                error: () => this.toast.error('Error al actualizar')
            });
        } else {
            this.addressService.create(this.formData).subscribe({
                next: () => {
                    this.toast.success('Direccion agregada');
                    this.closeModal();
                    this.loadAddresses();
                },
                error: () => this.toast.error('Error al agregar')
            });
        }
    }

    deleteAddress(id: number): void {
        if (!confirm('¿Estas seguro de eliminar esta direccion?')) return;
        this.addressService.delete(id).subscribe({
            next: () => {
                this.toast.success('Direccion eliminada');
                this.loadAddresses();
            },
            error: () => this.toast.error('Error al eliminar')
        });
    }

    setPrimary(id: number): void {
        this.addressService.setPrimary(id).subscribe({
            next: () => {
                this.toast.success('Direccion principal actualizada');
                this.loadAddresses();
            },
            error: () => this.toast.error('Error al actualizar')
        });
    }

    getTipoIcon(tipo: string): string {
        const icons: Record<string, string> = { casa: 'home', trabajo: 'business', otro: 'location_on' };
        return icons[tipo] || 'location_on';
    }

    getFullAddress(addr: Direccion): string {
        let parts = [addr.direccion_linea1];
        if (addr.direccion_linea2) parts.push(addr.direccion_linea2);
        parts.push(addr.distrito, addr.provincia, addr.departamento);
        return parts.join(', ');
    }
}
