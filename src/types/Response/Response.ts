export interface ResponseValidate {
    icon: 'success' | 'info' | 'warn' | 'error';
    message: string;
    summary?: string;
    life?: number;
}
