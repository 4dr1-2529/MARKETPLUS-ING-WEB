import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
    .then(() => {
        const statusEl = document.getElementById('angular-status');
        if (statusEl) {
            statusEl.className = 'ok';
            statusEl.textContent = '✅ Angular cargado';
        }
    })
    .catch(err => {
        console.error('Bootstrap error:', err);
        const statusEl = document.getElementById('angular-status');
        if (statusEl) {
            statusEl.className = 'err';
            statusEl.textContent = '❌ Angular ERROR: ' + err.message;
        }
        const diagEl = document.getElementById('pre-diag');
        if (diagEl) {
            diagEl.style.display = 'block';
            diagEl.style.background = '#7f1d1d';
            diagEl.innerHTML += '<div style="margin-top:8px;color:#fca5a5;">' + err.message + '</div>';
        }
    });
