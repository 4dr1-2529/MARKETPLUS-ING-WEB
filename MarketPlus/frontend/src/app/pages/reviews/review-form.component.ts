import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ReviewService } from '../../services/review.service';
import { ToastService } from '../../services/toast.service';
import { scaleAnimation } from '../../shared/animations';

@Component({
    selector: 'app-review-form',
    templateUrl: './review-form.component.html',
    styleUrls: ['./review-form.component.css'],
    animations: [scaleAnimation]
})
export class ReviewFormComponent implements OnInit {
    @Input() productoId!: number;
    @Output() reviewSubmitted = new EventEmitter<void>();

    rating = 0;
    hoverRating = 0;
    comentario = '';
    submitting = false;
    submitted = false;

    constructor(
        private reviewService: ReviewService,
        private toast: ToastService
    ) {}

    ngOnInit(): void {}

    setRating(r: number): void {
        this.rating = r;
    }

    submitReview(): void {
        if (this.rating === 0) {
            this.toast.warning('Selecciona una calificacion');
            return;
        }
        if (!this.comentario.trim()) {
            this.toast.warning('Escribe un comentario');
            return;
        }

        this.submitting = true;
        this.reviewService.create({
            producto_id: this.productoId,
            calificacion: this.rating,
            comentario: this.comentario.trim()
        }).subscribe({
            next: () => {
                this.submitting = false;
                this.submitted = true;
                this.toast.success('Valoracion enviada');
                this.reviewSubmitted.emit();
            },
            error: () => {
                this.submitting = false;
                this.toast.error('Error al enviar la valoracion');
            }
        });
    }

    resetForm(): void {
        this.rating = 0;
        this.hoverRating = 0;
        this.comentario = '';
        this.submitted = false;
    }
}
