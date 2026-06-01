import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';

@Component({
    selector: 'app-admin-reports',
    standalone: false,
    templateUrl: './reports.page.html',
    styleUrls: ['./reports.page.css']
})
export class AdminReportsPage implements OnInit {
    stats: any = {};
    reports: any = {};
    loading = true;

    constructor(private adminService: AdminService) {}

    ngOnInit(): void {
        this.loadData();
    }

    loadData(): void {
        this.loading = true;
        this.adminService.getDashboard().subscribe({
            next: (res) => {
                this.stats = res.data.stats;
                this.adminService.getReports().subscribe({
                    next: (reportRes) => {
                        this.reports = reportRes.data;
                        this.loading = false;
                    },
                    error: () => { this.loading = false; }
                });
            },
            error: () => { this.loading = false; }
        });
    }

    formatCurrency(amount: unknown): string {
        const value = this.toNumber(amount);
        return `S/ ${value.toFixed(2)}`;
    }

    formatPercent(value: unknown, decimals = 1): string {
        const numeric = this.toNumber(value);
        return `${numeric.toFixed(decimals)}%`;
    }

    formatDate(date: string): string {
        return new Date(date).toLocaleDateString('es-PE');
    }

    private toNumber(value: unknown): number {
        if (typeof value === 'number') {
            return Number.isFinite(value) ? value : 0;
        }
        if (typeof value === 'string') {
            const normalized = value.replace(',', '.').trim();
            const parsed = Number(normalized);
            return Number.isFinite(parsed) ? parsed : 0;
        }
        return 0;
    }
}
