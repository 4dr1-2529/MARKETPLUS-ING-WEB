import { trigger, state, transition, style, animate, query, stagger } from '@angular/animations';

export const fadeInAnimation = trigger('fadeIn', [
    transition(':enter', [
        style({ opacity: 0 }),
        animate('0.4s ease-out', style({ opacity: 1 }))
    ])
]);

export const slideUpAnimation = trigger('slideUp', [
    transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
    ])
]);

export const slideDownAnimation = trigger('slideDown', [
    transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('0.3s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
    ])
]);

export const scaleAnimation = trigger('scale', [
    transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9)' }),
        animate('0.3s ease-out', style({ opacity: 1, transform: 'scale(1)' }))
    ])
]);

export const listAnimation = trigger('list', [
    transition(':enter', [
        query(':enter', [
            style({ opacity: 0, transform: 'translateY(20px)' }),
            stagger('80ms', [
                animate('0.4s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
            ])
        ], { optional: true })
    ])
]);

export const cartAnimation = trigger('cartBadge', [
    transition('* => *', [
        style({ transform: 'scale(1.3)' }),
        animate('0.3s ease-out', style({ transform: 'scale(1)' }))
    ])
]);
