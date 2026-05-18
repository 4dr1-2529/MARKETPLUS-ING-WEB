import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models/usuario.model';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.css']
})
export class ProfilePage implements OnInit {
    user: Usuario | null = null;
    editing = false;
    formData: any = {};

    constructor(private auth: AuthService) {}

    ngOnInit(): void {
        this.auth.getProfile().subscribe(res => {
            this.user = res.data;
            this.formData = { ...res.data };
        });
    }

    saveProfile(): void {
        this.auth.updateProfile(this.formData).subscribe({
            next: () => { this.editing = false; this.ngOnInit(); },
            error: (err) => console.error(err)
        });
    }
}
