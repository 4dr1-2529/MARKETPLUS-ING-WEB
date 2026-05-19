import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {
    private darkSubject = new BehaviorSubject<boolean>(false);
    isDark$ = this.darkSubject.asObservable();

    constructor() {
        const saved = localStorage.getItem('marketplus-theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.setDark(saved === 'dark' || (!saved && prefersDark));
    }

    get isDark(): boolean {
        return this.darkSubject.value;
    }

    toggle(): void {
        this.setDark(!this.isDark);
    }

    setDark(dark: boolean): void {
        this.darkSubject.next(dark);
        document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
        localStorage.setItem('marketplus-theme', dark ? 'dark' : 'light');
    }
}
