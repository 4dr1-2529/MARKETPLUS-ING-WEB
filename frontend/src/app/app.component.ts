import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
        <app-navbar></app-navbar>
        <main class="main-content">
            <router-outlet></router-outlet>
        </main>
        <app-footer></app-footer>
        <app-loader></app-loader>
        <app-toast></app-toast>
    `,
    styles: [`
        .main-content { min-height: calc(100vh - 280px); padding-top: 70px; }
    `]
})
export class AppComponent {
    title = 'MarketPlus';
}
