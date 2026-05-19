import { Component, OnInit } from '@angular/core';
import { CouponService } from '../../services/coupon.service';
import { ToastService } from '../../services/toast.service';
import { Cupon } from '../../models/coupon.model';
import { fadeInAnimation } from '../../shared/animations';

@Component({
    selector: 'app-coupons',
    templateUrl: './coupons.page.html',
    styleUrls: ['./coupons.page.css'],
    animations: [fadeInAnimation]
})
export class CouponsPage implements OnInit {
    coupons: Cupon[] = [];
    loading = true;

    constructor(
        private couponService: CouponService,
        private toast: ToastService
    ) {}

    ngOnInit(): void {
        this.loadCoupons();
    }

    loadCoupons(): void {
        this.loading = true;
        this.couponService.getAll().subscribe({
            next: (res) => {
                this.coupons = res.data;
                this.loading = false;
            },
            error: () => {
                this.loading = false;
                this.toast.error('Error al cargar cupones');
            }
        });
    }

    copyCode(code: string): void {
        navigator.clipboard.writeText(code).then(() => {
            this.toast.success('Codigo copiado: ' + code);
        }).catch(() => {
            const input = document.createElement('input');
            input.value = code;
            document.body.appendChild(input);
            input.select();
            document.execCommand('copy');
            document.body.removeChild(input);
            this.toast.success('Codigo copiado: ' + code);
        });
    }

    getDiscountText(coupon: Cupon): string {
        if (coupon.tipo === 'porcentaje') {
            return `${coupon.valor}% de descuento`;
        }
        return `S/ ${coupon.valor} de descuento`;
    }

    getDaysRemaining(dateStr: string): number {
        const end = new Date(dateStr);
        const now = new Date();
        return Math.ceil((end.getTime() - now.getTime()) / 86400000);
    }

    getStatusClass(coupon: Cupon): string {
        if (coupon.estado === 'expirado') return 'expired';
        if (coupon.estado === 'agotado') return 'exhausted';
        return 'active';
    }

    getStatusText(coupon: Cupon): string {
        const days = this.getDaysRemaining(coupon.fecha_fin);
        if (coupon.estado === 'expirado') return 'Expirado';
        if (coupon.estado === 'agotado') return 'Agotado';
        if (days <= 3) return `Quedan ${days} dias`;
        return 'Activo';
    }

    getProgressPercent(coupon: Cupon): number {
        if (!coupon.usos_maximos) return 0;
        return Math.round(((coupon.usos_actuales || 0) / coupon.usos_maximos) * 100);
    }
}
