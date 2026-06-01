export function getApiErrorMessage(err: any, fallback = 'Error en la operacion'): string {
    const body = err?.error;
    if (body?.errors?.length) {
        return body.errors.map((e: { message?: string }) => e.message).filter(Boolean).join('. ');
    }
    return body?.message || fallback;
}
