export const NAME_REGEX = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const USERNAME_REGEX = /^[a-zA-Z0-9._-]{4,20}$/;

export type TipoEntrega = 'domicilio' | 'recojo_tienda';
export type TipoComprobante = 'boleta' | 'factura';

export const TIENDA_INFO = 'Recojo disponible en tienda MarketPlus.';
/** Aviso en formularios de pago durante el checkout */
export const PAGO_FORM_HINT = 'Completa los datos para confirmar tu compra.';

/** Mensajes del modal de compra exitosa */
export const COMPRA_EXITO_PAGO = 'Pago registrado correctamente';
export const COMPRA_EXITO_DETALLE = 'Tu pedido fue confirmado y esta en proceso de preparacion.';

export function digitsOnly(value: string, maxLength?: number): string {
    const digits = String(value || '').replace(/\D/g, '');
    return maxLength ? digits.slice(0, maxLength) : digits;
}

export function onNumericInput(event: Event, maxLength: number): string {
    const input = event.target as HTMLInputElement;
    const numeric = digitsOnly(input.value, maxLength);
    input.value = numeric;
    return numeric;
}

export function isDni(value: string): boolean {
    return /^\d{8}$/.test(String(value || '').trim());
}

export function isPhone(value: string): boolean {
    return /^\d{9}$/.test(String(value || '').trim());
}

export function isRuc(value: string): boolean {
    return /^\d{11}$/.test(String(value || '').trim());
}

export function isCardNumber(value: string): boolean {
    return /^\d{16}$/.test(digitsOnly(value, 16));
}

export function isCvv(value: string): boolean {
    return /^\d{3}$/.test(digitsOnly(value, 3));
}

export function formatCardNumberDisplay(value: string): string {
    const digits = digitsOnly(value, 16);
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
}

export function normalizeTipoEntrega(tipo: string | undefined): TipoEntrega {
    if (tipo === 'recojo_tienda') return 'recojo_tienda';
    return 'domicilio';
}

export function isExpiryDate(value: string): boolean {
    const match = String(value || '').trim().match(/^(\d{2})\/(\d{2})$/);
    if (!match) return false;
    const month = Number.parseInt(match[1], 10);
    const year = Number.parseInt(match[2], 10);
    if (month < 1 || month > 12) return false;
    const now = new Date();
    const currentYear = now.getFullYear() % 100;
    const currentMonth = now.getMonth() + 1;
    if (year < currentYear) return false;
    if (year === currentYear && month < currentMonth) return false;
    return true;
}

export function formatExpiryInput(value: string): string {
    const digits = digitsOnly(value, 4);
    if (digits.length <= 2) return digits;
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}
