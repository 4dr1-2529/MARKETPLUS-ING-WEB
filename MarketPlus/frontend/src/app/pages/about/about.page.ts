import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [RouterModule, CommonModule],
    templateUrl: './about.page.html',
    styleUrls: ['./about.page.css']
})
export class AboutPage {
    constructor() {}
}
