import { Component, OnInit } from '@angular/core';
import { AddressService } from '../../services/address.service';
import { ToastService } from '../../services/toast.service';
import { Direccion } from '../../models/address.model';
import { fadeInAnimation, scaleAnimation } from '../../shared/animations';
import {
    NAME_REGEX,
    TIENDA_INFO,
    TipoEntrega,
    isDni,
    isPhone,
    onNumericInput
} from '../../utils/form-validation.util';

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
    submitted = false;

    readonly tiendaInfo = TIENDA_INFO;
    formData: Partial<Direccion> = this.emptyForm();

    constructor(
        private readonly addressService: AddressService,
        private readonly toast: ToastService
    ) {}

    ngOnInit(): void {
        this.loadAddresses();
    }

    private emptyForm(): Partial<Direccion> {
        return {
            tipo: 'domicilio',
            destinatario: '',
            direccion_linea1: '',
            direccion_linea2: '',
            departamento: 'Junin',
            provincia: 'Huancayo',
            distrito: '',
            codigo_postal: '',
            referencia: '',
            telefono: '',
            dni_contacto: '',
            es_principal: false
        };
    }

    get isDomicilioForm(): boolean {
        return (this.formData.tipo || 'domicilio') === 'domicilio';
    }

    get destinatarioError(): string {
        const v = (this.formData.destinatario || '').trim();
        if (!v) return 'El destinatario es obligatorio';
        if (v.length < 3) return 'Minimo 3 caracteres';
        if (!NAME_REGEX.test(v)) return 'Solo letras y espacios';
        return '';
    }

    get direccionError(): string {
        if (!this.isDomicilioForm) return '';
        const v = (this.formData.direccion_linea1 || '').trim();
        if (!v) return 'La direccion es obligatoria';
        if (v.length < 5) return 'Minimo 5 caracteres';
        return '';
    }

    get departamentoError(): string {
        if (!this.isDomicilioForm) return '';
        const v = (this.formData.departamento || '').trim();
        if (!v) return 'Departamento obligatorio';
        if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(v)) return 'Solo letras y espacios';
        return '';
    }

    get provinciaError(): string {
        if (!this.isDomicilioForm) return '';
        return (this.formData.provincia || '').trim() ? '' : 'Provincia obligatoria';
    }

    get distritoError(): string {
        if (!this.isDomicilioForm) return '';
        return (this.formData.distrito || '').trim() ? '' : 'Distrito obligatorio';
    }

    get telefonoError(): string {
        const v = (this.formData.telefono || '').trim();
        if (!v) return 'El telefono es obligatorio';
        if (!isPhone(v)) return 'Debe tener exactamente 9 digitos';
        return '';
    }

    get dniRecojoError(): string {
        if (this.isDomicilioForm) return '';
        const v = (this.formData.dni_contacto || '').trim();
        if (!v) return 'El DNI es obligatorio';
        if (!isDni(v)) return 'Debe tener exactamente 8 digitos';
        return '';
    }

    get referenciaError(): string {
        if (!this.isDomicilioForm) return '';
        const v = (this.formData.referencia || '').trim();
        if (v.length > 120) return 'Maximo 120 caracteres';
        return '';
    }

    get isFormValid(): boolean {
        return !this.getFormValidationMessage();
    }

    getFormValidationMessage(): string {
        if (this.destinatarioError) return this.destinatarioError;
        if (this.telefonoError) return this.telefonoError;
        if (this.referenciaError) return this.referenciaError;
        if (this.isDomicilioForm) {
            return this.direccionError || this.departamentoError || this.provinciaError || this.distritoError || '';
        }
        return this.dniRecojoError;
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
        this.submitted = false;
        if (address) {
            this.editingId = address.id || null;
            this.formData = { ...address };
        } else {
            this.editingId = null;
            this.formData = this.emptyForm();
        }
        this.showModal = true;
        document.body.classList.add('modal-open');
    }

    closeModal(): void {
        this.showModal = false;
        this.editingId = null;
        this.submitted = false;
        document.body.classList.remove('modal-open');
    }

    onTipoEntregaChange(tipo: TipoEntrega): void {
        this.formData.tipo = tipo;
        if (tipo === 'recojo_tienda') {
            this.formData.direccion_linea1 = this.tiendaInfo;
            this.formData.departamento = 'Junin';
            this.formData.provincia = 'Huancayo';
            this.formData.distrito = 'Huancayo';
        }
    }

    onNumericField(field: 'telefono' | 'dni_contacto', event: Event): void {
        const value = onNumericInput(event, field === 'dni_contacto' ? 8 : 9);
        if (field === 'telefono') this.formData.telefono = value;
        if (field === 'dni_contacto') this.formData.dni_contacto = value;
    }

    saveAddress(): void {
        this.submitted = true;
        const validationMsg = this.getFormValidationMessage();
        if (validationMsg) {
            this.toast.warning(validationMsg);
            return;
        }

        const request = this.editingId
            ? this.addressService.update(this.editingId, this.formData)
            : this.addressService.create(this.formData);

        request.subscribe({
            next: () => {
                this.toast.success(this.editingId ? 'Entrega actualizada' : 'Entrega agregada');
                this.closeModal();
                this.loadAddresses();
            },
            error: (err) => this.toast.error(err.error?.message || 'Error al guardar')
        });
    }

    deleteAddress(id: number): void {
        if (!confirm('¿Deseas eliminar esta direccion de entrega?')) return;
        this.addressService.delete(id).subscribe({
            next: () => {
                this.toast.success('Entrega eliminada');
                this.loadAddresses();
            },
            error: (err) => this.toast.error(err.error?.message || 'Error al eliminar')
        });
    }

    setPrimary(id: number): void {
        this.addressService.setPrimary(id).subscribe({
            next: () => {
                this.toast.success('Entrega principal actualizada');
                this.loadAddresses();
            },
            error: () => this.toast.error('Error al actualizar')
        });
    }

    getTipoIcon(tipo: string): string {
        return tipo === 'recojo_tienda' ? 'store' : 'home';
    }

    getTipoLabel(tipo: string): string {
        return tipo === 'recojo_tienda' ? 'Recojo en tienda' : 'Domicilio';
    }

    getFullAddress(addr: Direccion): string {
        if (addr.tipo === 'recojo_tienda') {
            return `${this.tiendaInfo} — Recoge: ${addr.destinatario}`;
        }
        const parts = [addr.direccion_linea1];
        if (addr.direccion_linea2) parts.push(addr.direccion_linea2);
        parts.push(addr.distrito, addr.provincia, addr.departamento);
        return parts.join(', ');
    }

    showError(error: string): boolean {
        return this.submitted && !!error;
    }
}
